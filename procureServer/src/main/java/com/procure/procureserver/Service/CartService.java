package com.procure.procureserver.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.List;
import com.procure.procureserver.Mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class CartService {
    private final Lock lock = new ReentrantLock(true);
    private final ObjectMapper objectMapper=new ObjectMapper();
    private ConcurrentHashMap<Long,List> Lists=new ConcurrentHashMap<Long, List>();
    private final CartMapper mapper;
    private static Long listNumbers;
    @Autowired
    public CartService(CartMapper mapper){
        this.mapper=mapper;
        listNumbers=mapper.getListNumbers();
    }


    public Item getItem(long id) {
        return mapper.getItemByID(id);
    }

    public long tryPurchase(long[][] pairs) throws JsonProcessingException {
        long[] t=new long[pairs.length];
        Long serialNumber= -1L;
        lock.lock();
        try{
            for (int i=0;i<pairs.length;i++) {
                t[i]=mapper.getQuantityByID(pairs[i][0]);
                if(t[i]<pairs[i][1]){
                    return -1;
                }
            }

            Map<Long, Long> map=new HashMap<>();
            for (long[] pair : pairs) {
                mapper.purchase(pair[0], pair[1]);
                map.put(pair[0],pair[1]);
            }
            String json="";
            json= objectMapper.writeValueAsString(map);
            serialNumber=generateSerialNumber();
            List newList=new List(serialNumber,json,null,"暂时为空","暂时为空",new Timestamp(System.currentTimeMillis()));
            Lists.put(serialNumber,newList);
            mapper.addList(newList);
        }finally {
            lock.unlock();
        }

        return serialNumber;
    }



    public java.util.List<String> getNotEnoughItems(long[][] pairs) {
        java.util.List<String> stringList=new ArrayList<>();
        for (long[] pair : pairs) {
            if (mapper.getQuantityByID(pair[0]) < pair[1]) {
                stringList.add(mapper.getItemNameByID(pair[0]));
            }
        }
        return stringList;
    }
    public void resetReservation(Long serialNumber) throws JsonProcessingException {
        List deleteList=Lists.remove(serialNumber);
        long[][] pairs=objectMapper.readValue(deleteList.getListData(),long[][].class);
        for (long[] pair : pairs) {
            mapper.resetItemQuantity(pair[0],pair[1]);
        }
    }
    public void finishReservation(Long serialNumber,BigDecimal cash){
        List finishedReservation= Lists.remove(serialNumber);
        finishedReservation.setAmount(cash);
        mapper.addAmount(serialNumber,cash);
    }
    private Long generateSerialNumber() {
        return listNumbers++;
    }
}

package com.procure.procureserver.Service;

import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.List;
import com.procure.procureserver.Mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class CartService {
    private CopyOnWriteArrayList<List> arrayList=new CopyOnWriteArrayList<>();
    private final CartMapper mapper;
    @Autowired
    public CartService(CartMapper mapper){
        this.mapper=mapper;
    }


    public Item getItem(int id) {
        return mapper.getItemByID(id);
    }

    synchronized public int tryPurchase(int[][] pairs) {
        int[] t=new int[pairs.length];
        for (int i=0;i<pairs.length;i++) {
            t[i]=mapper.getQuantityByID(pairs[i][0]);
            System.out.println(t[i]);
            if(t[i]<pairs[i][1]){
                return -1;
            }
        }
        for (int[] pair : pairs) {
            mapper.purchase(pair[0], pair[1]);
        }
        return 0;
    }
}

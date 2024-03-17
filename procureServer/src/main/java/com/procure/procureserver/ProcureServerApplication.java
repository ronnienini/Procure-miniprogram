package com.procure.procureserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class ProcureServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProcureServerApplication.class, args);
	}

}

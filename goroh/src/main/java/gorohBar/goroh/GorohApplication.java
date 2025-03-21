package gorohBar.goroh;

import gorohBar.goroh.Model.SingUpUser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GorohApplication {

	public static void main(String[] args) {

		SpringApplication.run(GorohApplication.class, args);

	}

}

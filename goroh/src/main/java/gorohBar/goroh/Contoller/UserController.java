package gorohBar.goroh.Contoller;

import com.netflix.discovery.converters.Auto;
import gorohBar.goroh.DTO.SingUpDTO;
import gorohBar.goroh.DTO.SingUpShowDTO;
import gorohBar.goroh.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public SingUpShowDTO singUp(@RequestBody @Valid SingUpDTO dto) {
        return userService.singUp(dto);
    }

    @GetMapping(params = "email")
    @ResponseStatus(HttpStatus.OK)
    public SingUpShowDTO showUser(@RequestParam String email) {
        return userService.showUser(email);
    }


}

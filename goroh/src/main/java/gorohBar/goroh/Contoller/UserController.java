package gorohBar.goroh.Contoller;

import com.fasterxml.jackson.core.JsonProcessingException;
import gorohBar.goroh.DTO.SingUpDTO;
import gorohBar.goroh.DTO.SingUpShowDTO;
import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @GetMapping(value = "/byEmail", params = "email")
    @ResponseStatus(HttpStatus.OK)
    public SingUpShowDTO showUser(@RequestParam String email) {
        return userService.showUserByEmail(email);
    }

    @GetMapping(value = "/byId", params = "id")
    @ResponseStatus(HttpStatus.OK)
    public SingUpShowDTO showUserById(@RequestParam Long id) {
        return userService.showUserByID(id);
    }

    @GetMapping("userList")
    @ResponseStatus(HttpStatus.OK)
    public Page<SingUpShowDTO> showUserList(Pageable pageable) {
        return userService.showAll(pageable);
    }

    @PutMapping(value = "/update", params = "id")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SingUpShowDTO updateUser(@RequestBody SingUpUser user, @RequestParam Long id) {
        return userService.updateUser(user, id);
    }

    @PatchMapping(value = "/patch", params = "id")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SingUpShowDTO patchUser(@RequestBody String json, @RequestParam Long id) throws JsonProcessingException {
        return userService.patchUser(json, id);
    }

    @DeleteMapping(value = "/delete", params = "id")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@RequestParam Long id) {
        userService.deleteUser(id);
    }

}

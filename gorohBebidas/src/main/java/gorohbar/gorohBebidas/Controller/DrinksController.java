package gorohbar.gorohBebidas.Controller;

import gorohbar.gorohBebidas.DTO.NewDrinkDTO;
import gorohbar.gorohBebidas.DTO.ShowDrinkDTO;
import gorohbar.gorohBebidas.Service.DrinkService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/drink")
public class DrinksController {

    @Autowired
    private DrinkService drinkService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public ShowDrinkDTO newDrink (@RequestBody @Valid  NewDrinkDTO newDrinkDTO) {
        return drinkService.createDrink(newDrinkDTO);
    }

    @GetMapping(value = "/getDrink", params = "name")
    @ResponseStatus(HttpStatus.OK)
    public ShowDrinkDTO getByName (@RequestParam String name) {
        return drinkService.findByName(name);
    }

    @GetMapping(value="getDrink", params = "id")
    @ResponseStatus(HttpStatus.OK)
    public ShowDrinkDTO getById(@RequestParam Long id) {
        return drinkService.findById(id);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public Page<ShowDrinkDTO> showDrinks (Pageable pageable){
        return drinkService.showDrinks(pageable);
    }

    @GetMapping(value ="/price",params = {"initialPrice", "finalPrice"})
    @ResponseStatus(HttpStatus.OK)
    public List<ShowDrinkDTO> getByPriceBetween (@RequestParam BigDecimal initialPrice, @RequestParam BigDecimal finalPrice) {
        return drinkService.showPrices(initialPrice, finalPrice);
    }
}

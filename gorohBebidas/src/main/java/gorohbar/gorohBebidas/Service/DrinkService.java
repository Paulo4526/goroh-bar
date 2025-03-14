package gorohbar.gorohBebidas.Service;

import gorohbar.gorohBebidas.DTO.NewDrinkDTO;
import gorohbar.gorohBebidas.DTO.ShowDrinkDTO;
import gorohbar.gorohBebidas.Model.Drinks;
import gorohbar.gorohBebidas.Repository.DrinkRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DrinkService {

    @Autowired
    private DrinkRepository drinkRepository;

    public ShowDrinkDTO createDrink(NewDrinkDTO newDrinkDTO) {
        Drinks drink = new Drinks();
        BeanUtils.copyProperties(newDrinkDTO, drink);
        return new ShowDrinkDTO(drinkRepository.save(drink));
    }

    public ShowDrinkDTO findByName(String name){
        Optional<Drinks> drinksOptional = drinkRepository.findByName(name);
        if(drinksOptional.isPresent()){
            return new ShowDrinkDTO(drinksOptional.get());
        }else{
            throw  new RuntimeException("Drink not found!");
        }
    }

    public ShowDrinkDTO findById(Long id) {
        Optional<Drinks> drinksOptional = drinkRepository.findById(id);
        if(drinksOptional.isPresent()){
            return new ShowDrinkDTO(drinksOptional.get());
        }else{
            throw new RuntimeException("Id not found!");
        }
    }

    public List<ShowDrinkDTO> showPrices (BigDecimal initialPrice, BigDecimal finalPrice){
        List<Drinks> drinks = drinkRepository.findByPriceBetween(initialPrice, finalPrice);
        if(drinks.isEmpty()){
            throw new RuntimeException("Prices not found!");
        }else{
            return drinks.stream()
                    .map(ShowDrinkDTO::new)
                    .toList();
        }
    }

    public Page<ShowDrinkDTO> showDrinks(Pageable pageable){
        return drinkRepository.findAll(pageable).map(ShowDrinkDTO::new);
    }
}

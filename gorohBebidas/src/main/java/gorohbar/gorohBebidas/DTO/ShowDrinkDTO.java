package gorohbar.gorohBebidas.DTO;

import gorohbar.gorohBebidas.Model.Drinks;

import java.math.BigDecimal;

public record ShowDrinkDTO(
        Long id,
        String name,
        String description,
        BigDecimal price
) {
    public ShowDrinkDTO (Drinks drinks){
        this(drinks.getId(), drinks.getName(), drinks.getDescription(), drinks.getPrice());
    }
}

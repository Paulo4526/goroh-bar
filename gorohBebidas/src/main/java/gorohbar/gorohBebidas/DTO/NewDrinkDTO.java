package gorohbar.gorohBebidas.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record NewDrinkDTO(

        @NotBlank(message = "The name space could not be blank, please put a valid name!")
        String name,

        @NotBlank(message = "The name space could not be blank, please put a valid name!")
        String description,

        @NotNull(message = "The price field could not be null, please provide a valid price!")
        @DecimalMin(value = "0.01", message = "The price must be greater than 0.01!")
        @Digits(integer = 10, fraction = 2, message = "The price must have at most 10 integer digits and 2 decimal places!")
        BigDecimal price

) {
}

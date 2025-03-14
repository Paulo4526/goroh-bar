package gorohbar.gorohBebidas.Repository;

import gorohbar.gorohBebidas.Model.Drinks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface DrinkRepository extends JpaRepository<Drinks, Long> {

    Optional<Drinks> findByName(String name);
    List<Drinks> findByPriceBetween (BigDecimal initialPrice, BigDecimal finalPrice);

//    @Query("SELECT c FROM Contato c WHERE c.email = :email")
//    public Optional<Contato> buscarPeloEmail(@Param("email") String email);
}

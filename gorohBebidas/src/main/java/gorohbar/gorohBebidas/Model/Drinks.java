package gorohbar.gorohBebidas.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_SIP_DRINK")
public class Drinks {
    @Id
    @GeneratedValue(generator = "SQ_DRINK", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(sequenceName = "SQ_DRINK", name = "SQ_DRINK", allocationSize = 1)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
}

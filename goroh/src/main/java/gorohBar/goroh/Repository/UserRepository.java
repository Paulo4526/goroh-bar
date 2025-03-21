package gorohBar.goroh.Repository;

import gorohBar.goroh.Model.SingUpUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<SingUpUser, Long> {

    UserDetails findByEmail(String email);

    @Query("SELECT c FROM SingUpUser c WHERE c.email = :email")
    public Optional<SingUpUser> getUserByEmail(@Param("email") String email);

    @Query("SELECT c FROM SingUpUser c WHERE c.userID = :id")
    public Optional<SingUpUser> getUserById(@Param("id") Long id);
}

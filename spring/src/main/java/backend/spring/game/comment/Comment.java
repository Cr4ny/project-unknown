package backend.spring.game.comment;

import backend.spring.enduser.Enduser;
import backend.spring.game.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @ManyToOne
    @JoinColumn(name ="gameId",nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "enduserId",nullable = false)
    private Enduser enduser;

    private Instant createdAt;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    public Comment (){}

    public Comment (String content,Enduser enduser,Game game){
        this.content = content;
        this.createdAt = Instant.now();
        this.enduser = enduser;
        this.game = game;
    }


}

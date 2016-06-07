import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Oresto on 6/7/2016.
 */
public class Main {
  public static void main(String[] args) {
    String pathToFile = "";
    FileQuestionProvider fileQuestionProvider = new FileQuestionProvider();
    QuestionAskerMenu questionAskerMenu = new QuestionAskerMenuImpl();
//    Set<Question> questions = fileQuestionProvider.getQuestions();
    Set<Question> questions = new HashSet<>();
    questions.add(new Question("some question1", Arrays.asList("a", "b", "c")));
    questions.add(new Question("some question2", Arrays.asList("b", "a", "c")));
    questions.add(new Question("some question3", Arrays.asList("c", "b", "a")));
    questionAskerMenu.buildMenu(questions);
  }
}

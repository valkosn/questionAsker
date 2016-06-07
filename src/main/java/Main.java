import java.util.Set;

/**
 * Created by Oresto on 6/7/2016.
 */
public class Main {
  public static void main(String[] args) {
    String pathToFile = "";
    FileQuestionProvider fileQuestionProvider = new FileQuestionProvider();
    QuestionAskerMenu questionAskerMenu = new QuestionAskerMenuImpl();
    Set<Question> questions = fileQuestionProvider.getQuestions();

    questionAskerMenu.buildMenu(questions);
  }
}

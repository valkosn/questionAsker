import java.util.Set;

/**
 * Created by Oresto on 6/7/2016.
 */
public class Main {
  public static void main(String[] args) {
    String pathToFile = args[0];
    FileQuestionProvider fileQuestionProvider = new FileQuestionProvider(pathToFile);
    QuestionAskerMenu questionAskerMenu = new QuestionAskerMenuImpl();
    Set<Question> questions = fileQuestionProvider.getQuestions();
    questionAskerMenu.buildMenu(questions);
  }
}

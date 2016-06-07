import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**
 * Created by Oresto on 6/7/2016.
 */
public class QuestionAskerMenuImpl implements QuestionAskerMenu {
  @Override
  public void buildMenu(Set<Question> questions) {
    try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in))) {
      System.out.println("To quit type [q], for next question type [n]");
      System.out.println("Good luck!!!\n\n");
      for (Question question : questions) {
        List<String> answersToPublishing = printQuestionAndCheckAnswer(question, bufferedReader);
        waiting:
        while (true) {
          switch (checkTheAnswer(bufferedReader, question.getAnswer(), answersToPublishing)) {
            case NEXT: {
              System.out.println("\n\n");
              break waiting;
            }
            case QUIT:
              System.out.println("Bye-bye ;(");
              System.exit(1);
            case TYPO:
              System.out.println("Please type number of the answer!!!");
          }
        }
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private List<String> printQuestionAndCheckAnswer(Question question, BufferedReader bufferedReader) throws IOException {
    System.out.println(question.getQuestion());

    List<String> originalAnswers = question.getAnswer();
    List<String> answersToPublishing = new ArrayList<>(originalAnswers);

    Collections.shuffle(answersToPublishing);

    int i = 1;
    for (String answer : answersToPublishing) {
      System.out.println(i++ + ". " + answer);
    }

    return answersToPublishing;
  }

  private Options checkTheAnswer(BufferedReader bufferedReader, List<String> originalAnswers, List<String> answersToPublishing) throws IOException {
    String rawSelectedAnswer = bufferedReader.readLine();
    if (rawSelectedAnswer != null && !rawSelectedAnswer.isEmpty()) {
      if ("q".equalsIgnoreCase(rawSelectedAnswer)) {
        return Options.QUIT;
      }
      if ("n".equalsIgnoreCase(rawSelectedAnswer)) {
        return Options.NEXT;
      }
      int selectedAnswer = 0;

      try {
        selectedAnswer = Integer.parseInt(rawSelectedAnswer) - 1;
      } catch (NumberFormatException e) {
        return Options.TYPO;
      }

      if (answersToPublishing.size() >= selectedAnswer) {
        if (answersToPublishing.get(selectedAnswer).equalsIgnoreCase(originalAnswers.get(0))) {
          System.out.println("You are right!! :)");
        } else {
          System.out.println("NOOOO!!! You are wrong");
          System.out.println("Right answer is " + originalAnswers.get(0));
          System.out.println("Be careful next time");
        }
      }
    }
    return Options.NEXT;
  }

  private enum Options {
    NEXT, QUIT, TYPO;
  }
}

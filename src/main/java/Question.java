import java.util.List;

/**
 * Created by Valko Serhii on 07-Jun-16.
 */
public class Question {

    private String question;
    private List<String> answer;

    public Question(String question, List<String> answer) {
        this.question = question;
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getAnswer() {
        return answer;
    }

    public void setAnswer(List<String> answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "question:[" + question + "], answer " + answer.toString();
    }
}

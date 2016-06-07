import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Valko Serhii on 07-Jun-16.
 */
public class FileQuestionProvider implements QuestionProvider {

  private String filePath;
  private Set<Question> questions = new HashSet<>();

  public FileQuestionProvider(String filePath) {
    this.filePath = filePath;
  }

  @Override
  public Set<Question> getQuestions() {
    JSONParser parser = new JSONParser();
    try (BufferedReader br = new BufferedReader(new FileReader(filePath))){
      Object obj = parser.parse(br);
      JSONArray array = (JSONArray) obj;
      for (Object o : array) {
        JSONObject jsonObject = (JSONObject) o;
        String question = (String) jsonObject.get("question");
        JSONArray quesArray = (JSONArray) jsonObject.get("answers");

        List<String> answersList = new ArrayList<>(quesArray.size());
        for (Object s : quesArray) {
          answersList.add((String) s);
        }
        questions.add(new Question(question, answersList));
      }
    } catch (Exception pe) {
      throw new RuntimeException(pe);
    }
    return questions;
  }
}

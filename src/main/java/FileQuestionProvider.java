import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;

/**
 * Created by Valko Serhii on 07-Jun-16.
 */
public class FileQuestionProvider implements QuestionProvider {

    private String filePath;
    private String jsonData;
    private Set<Question> questions = new HashSet<>();

    public FileQuestionProvider(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public Set<Question> getQuestions() {
        jsonData = readFile(filePath);
        JSONObject jsonObject = new JSONObject();

        JSONArray jsons = new JSONArray(jsonData);




        String question = jsonObject.getString("question");
        JSONArray answers = new JSONArray(jsonObject.getJSONArray("answers").toString());

        List<String> answersList = new ArrayList<>();
        for (int i = 0; i < answers.length(); i++) {
            answersList.add(answers.getString(i));
        }
        questions.add(new Question(question, answersList));

        return questions;
    }

    private String readFile(String filename) {
        String result = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            result = sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result.trim();
    }
}

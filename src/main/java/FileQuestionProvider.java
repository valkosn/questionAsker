import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
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
        JSONTokener jsonTokener;
        try {
            jsonTokener = new JSONTokener(new FileReader(filePath));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONArray allJSONQuestions = new JSONArray(jsonTokener);

        for (Object currObj : allJSONQuestions) {
            JSONObject jsonObject = (JSONObject)currObj;
            String question = jsonObject.getString("question");
            JSONArray answers = new JSONArray(jsonObject.getJSONArray("answers").toString());
            List<String> answersList = new ArrayList<>(answers.length());
            for (Object currAnswer : answers) {
                answersList.add((String)currAnswer);
            }
            questions.add(new Question(question, answersList));
        }
        return questions;
    }
}

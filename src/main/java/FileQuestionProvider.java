import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;

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
        try{
            BufferedReader br = new BufferedReader(new FileReader(filePath));
            Object obj = parser.parse(br);
            JSONArray array = (JSONArray)obj;
            for (int i = 0; i < array.size(); i++){
                JSONObject jsonObject = (JSONObject)array.get(i);
                String question = (String)jsonObject.get("question");
                List<String> answersList = new ArrayList<>();

                JSONArray quesArray = (JSONArray) jsonObject.get("answers");
                for(int j = 0; j< quesArray.size(); j++ ){
                    answersList.add((String) quesArray.get(j));
                }
                questions.add(new Question(question, answersList));
            }
        }catch(Exception pe){

            pe.printStackTrace();
            System.out.println(pe);
        }
        return questions;
    }
}

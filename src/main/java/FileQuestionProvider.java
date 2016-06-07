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
    private String jsonData;
    private Set<Question> questions = new HashSet<>();

    public FileQuestionProvider(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public Set<Question> getQuestions() {
        JSONParser parser = new JSONParser();
        String s = "";

        try{
            BufferedReader br = new BufferedReader(new FileReader(filePath));

            Object obj = parser.parse(br);
            JSONArray array = (JSONArray)obj;

            System.out.println("The 2nd element of array");
            System.out.println(array.get(1));
            System.out.println();

            JSONObject obj2 = (JSONObject)array.get(1);
            System.out.println("Field \"1\"");
            System.out.println(obj2.get("1"));

            s = "{}";
            obj = parser.parse(s);
            System.out.println(obj);

            s = "[5,]";
            obj = parser.parse(s);
            System.out.println(obj);

            s = "[5,,2]";
            obj = parser.parse(s);
            System.out.println(obj);
        }catch(Exception pe){

            pe.printStackTrace();
            System.out.println(pe);
        }
//
//        JSONArray arr = obj.getJSONArray("posts");
//        for (int i = 0; i < arr.length(); i++)
//        {
//            String post_id = arr.getJSONObject(i).getString("post_id");
//        }
        return Collections.emptySet();
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
        return result;
    }
}

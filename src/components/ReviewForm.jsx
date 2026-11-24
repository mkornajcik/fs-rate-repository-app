import Text from "./Text";
import { useFormik } from "formik";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import theme from "./theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useReview from "../hooks/useReview";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: theme.colors.primary,
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: theme.colors.error,
    marginTop: -5,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number between 0 and 100")
    .integer("Rating must be a whole number")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  text: yup.string().optional(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

export const ReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && styles.errorInput]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && styles.errorInput]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.rating && formik.errors.rating && styles.errorInput]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
      />
      {formik.touched.rating && formik.errors.rating && <Text style={styles.error}>{formik.errors.rating}</Text>}

      <TextInput
        style={[styles.input, formik.touched.text && formik.errors.text && styles.errorInput]}
        multiline
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
      />
      {formik.touched.text && formik.errors.text && <Text style={styles.error}>{formik.errors.text}</Text>}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await review({ ownerName, repositoryName, rating: Number(rating), text });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;

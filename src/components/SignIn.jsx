import Text from "./Text";
import { useFormik } from "formik";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import theme from "./theme";
import * as yup from "yup";

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
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, formik.touched.password && formik.errors.password && styles.errorInput]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  asyncStorage,
  networking,
} from "reactotron-react-native";

// create the instance
const reactotron = Reactotron.configure({ name: "SuryaDT" })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(asyncStorage())
  .use(networking())
  .connect();

// attach to console
console.tron = reactotron;

export default reactotron;

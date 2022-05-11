import Tabs from "./components/tabs";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Tabs />).toJSON();
  expect(tree).toMatchSnapshot();
});


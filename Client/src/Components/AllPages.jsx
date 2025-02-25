import { Routes, Route } from "react-router-dom";
import Main from "./UserAuths/Main";
import VerificationSuccess from "./MailComponents/Verificationsucess";
import VerificationFailed from "./MailComponents/VerificationFailed";
import ForgotPass from "./UserAuths/ForgotPass";
import Role from "./UserAuths/Role";
import Dashboard from "./Dashboard/Dashboard";
import Test from "./test";

function AllPages() {
  return (
    <Routes>
      <Route path="*" element={<Main />}></Route>

      <Route
        path="api/mail-verified-successfully"
        element={<VerificationSuccess />}
      ></Route>
      <Route
        path="api/mail-verified-failed"
        element={<VerificationFailed />}
      ></Route>
      <Route path="/ForgotPass" element={<ForgotPass />}></Route>
      <Route path="/Role" element={<Role />}></Route>
      <Route path="/dashboard/*" element={<Dashboard />}></Route>

      <Route path="/test" element={<Test />}></Route>
    </Routes>
  );
}

export default AllPages;

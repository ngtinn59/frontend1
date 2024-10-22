import Certificate from './components/certificates';
import Education from './components/educations';
import Experience from './components/experiences';
import Prize from './components/prizes';
import Project from './components/projects';
import Skill from './components/skills';
import Activity from './components/activities';
import PersonalInfor from './components/personalInformation';
import Objective from './components/objectives';

export default function Profile() {
  return (
    <div className="px-5 pt-4 pb-5">
      <div style={{ width: '70%' }}>
        <PersonalInfor />
        <Education />
        <Experience />
        <Project />
        <Skill />
        <Certificate />
        <Prize />
        <Activity />
		<Objective />
      </div>
    </div>
  );
}

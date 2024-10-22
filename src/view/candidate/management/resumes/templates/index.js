import { createContext, useContext, useEffect, useState } from 'react';
import { CandidateContext } from '../../layouts/CandidateLayout';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import resumeApi from '../../../../../api/resume';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Template1 from './template1';
import Template2 from './template2';
import Template3 from './template3';
import html2canvas from 'html2canvas';

export const TemplateContext = createContext();

export default function Template() {
  const {
    personal,
    educations,
    experiences,
    projects,
    skills,
    certificates,
    prizes,
    activities,
    others,
    cvMode,
    setCvMode,
  } = useContext(CandidateContext);

  const { id } = useParams(); //resume ID if exist
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [fullname, setFullname] = useState('');
  const [basicInfor, setBasicInfor] = useState({});
  const [cvEducations, setCvEducations] = useState([{}]);
  const [cvExperiences, setCvExperiences] = useState([{}]);
  const [cvProjects, setCvProjects] = useState([{}]);
  const [cvSkills, setCvSkills] = useState([{}]);
  const [cvCertificates, setCvCertificates] = useState([{}]);
  const [cvPrizes, setCvPrizes] = useState([{}]);
  const [cvActivities, setCvActivities] = useState([{}]);
  const [cvOthers, setCvOthers] = useState([{}]);
  const [parts, setParts] = useState([
    'personal',
    'objective',
    'skill',
    'certificate',
    'prize',
    'other',
    'education',
    'experience',
    'project',
    'activity',
  ]);
  const defaultPartMenu = [
    { key: 'personal', name: 'Thông tin cá nhân', on: true },
    { key: 'objective', name: 'Mục tiêu nghề nghiệp', on: true },
    { key: 'education', name: 'Học vấn', on: true },
    { key: 'experience', name: 'Kinh nghiệm', on: true },
    { key: 'project', name: 'Dự án', on: true },
    { key: 'skill', name: 'Kỹ năng', on: true },
    { key: 'certificate', name: 'Chứng chỉ', on: true },
    { key: 'prize', name: 'Giải thưởng', on: true },
    { key: 'activity', name: 'Hoạt động', on: true },
    { key: 'other', name: 'Khác', on: true },
  ];
  const [partMenu, setPartMenu] = useState(defaultPartMenu);

  const getEditResume = async () => {
    const res = await resumeApi.getById(id);
    const partsOrder = JSON.parse(res.parts_order);
    console.log();
    setParts(partsOrder);
    setBasicInfor(res.basicInfor);

    if (res.skills.length > 0) {
      setCvSkills(res.skills);
    }
    if (res.certificates.length > 0) {
      setCvCertificates(res.certificates);
    }
    if (res.prizes.length > 0) {
      setCvPrizes(res.prizes);
    }
    if (res.others.length > 0) {
      setCvOthers(res.others);
    }
    if (res.educations.length > 0) {
      setCvEducations(res.educations);
    }
    if (res.experiences.length > 0) {
      setCvExperiences(res.experiences);
    }
    if (res.projects.length > 0) {
      setCvProjects(res.projects);
    }
    if (res.activities.length > 0) {
      setCvActivities(res.activities);
    }
    let tempMenu = [...defaultPartMenu];
    tempMenu.forEach((item, index, self) => {
      if (!partsOrder.includes(item.key)) {
        self[index].on = false;
      }
    });
    setPartMenu(tempMenu);
  };

  useEffect(() => {
    reset(); //reset form to get defaultValue correctly
  }, [basicInfor, reset]);

  useEffect(() => {
    if (id) {
      setCvMode('EDIT');
      getEditResume();
    }
  }, [id, setCvMode]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (basicInfor.lastname && basicInfor.firstname)
        setFullname(basicInfor.lastname + ' ' + basicInfor.firstname);
    } else if (cvMode === 'EDIT') {
      setFullname(basicInfor.fullname);
    }
  }, [basicInfor, cvMode]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      setBasicInfor(personal);
    }
  }, [cvMode, personal]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (educations.length > 0) setCvEducations(educations);
    }
  }, [cvMode, educations]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (experiences.length > 0) setCvExperiences(experiences);
    }
  }, [cvMode, experiences]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (projects.length > 0) setCvProjects(projects);
    }
  }, [cvMode, projects]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (skills.length > 0) setCvSkills(skills);
    }
  }, [cvMode, skills]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (certificates.length > 0) setCvCertificates(certificates);
    }
  }, [certificates, cvMode]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (prizes.length > 0) setCvPrizes(prizes);
    }
  }, [cvMode, prizes]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (activities.length > 0) setCvActivities(activities);
    }
  }, [activities, cvMode]);

  useEffect(() => {
    if (cvMode === 'CREATE_1') {
      if (others.length > 0) setCvOthers(others);
    }
  }, [cvMode, others]);

  const formatDate = (str) => {
    const arr = str.split(/[/, -]/);
    const len = arr.length;
    if (arr[0].length !== 4) {
      if (len === 2) {
        let temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
      } else if (len === 3) {
        let temp = arr[0];
        arr[0] = arr[2];
        arr[2] = temp;
      }
    }

    return dayjs(arr.join('-')).format('YYYY-MM-DD');
  };

  const formatDateInPart = (part) => {
    part.forEach((item, index, self) => {
      if (item.start_date) self[index].start_date = formatDate(item.start_date);
      if (item.end_date) self[index].end_date = formatDate(item.end_date);
      if (item.receive_date)
        self[index].receive_date = formatDate(item.receive_date);
    });
  };

  const isPresentInParts = (partName) => {
    return parts.findIndex((item) => item === partName) > -1 ? true : false;
  };

  const onSubmit = async (data) => {
    var dob = '';
    if (data.dob) {
      const [dobDay, dobMonth, dobYear] = data.dob.split('/');
      dob = dobYear + '-' + dobMonth + '-' + dobDay;
    }

    let educations = [...cvEducations];
    let experiences = [...cvExperiences];
    let projects = [...cvProjects];
    let skills = [...cvSkills];
    let certificates = [...cvCertificates];
    let prizes = [...cvPrizes];
    let activities = [...cvActivities];
    let others = [...cvOthers];

    formatDateInPart(educations);
    formatDateInPart(experiences);
    formatDateInPart(projects);
    formatDateInPart(activities);
    formatDateInPart(certificates);
    formatDateInPart(prizes);

    let postData = {
      basicInfor: {
        ...data,
        dob,
        avatar: basicInfor.avatar, // Sử dụng avatar từ trạng thái
        parts_order: JSON.stringify(parts),
      },
      educations: isPresentInParts('education') ? educations : null,
      experiences: isPresentInParts('experience') ? experiences : null,
      projects: isPresentInParts('project') ? projects : null,
      skills: isPresentInParts('skill') ? skills : null,
      certificates: isPresentInParts('certificate') ? certificates : null,
      prizes: isPresentInParts('prize') ? prizes : null,
      activities: isPresentInParts('activity') ? activities : null,
      others: isPresentInParts('other') ? others : null,
    };
    if (cvMode.startsWith('CREATE')) {
      try {
        await resumeApi.create(postData);
        toast.success('Tạo mới thành công!');
        nav('/candidate/resumes');
      } catch (e) {
        toast.error('Đã có lỗi xảy ra!');
        console.error('>>Error:', e.response.data.message);
      }
    } else if (cvMode === 'EDIT') {
      postData = { ...postData, resume_id: id };
      try {
        const res = await resumeApi.update(postData);
        toast.success('Cập nhật thành công!');
        nav('/candidate/resumes');
      } catch (e) {
        toast.error('Đã có lỗi xảy ra!');
        console.error('>>Error:', e.response.data.message);
      }
    }
  };

  const handleDownload = async () => {
    const { jsPDF } = require('jspdf'); // Import jsPDF
    let cvElement = document.querySelector('#resume');

    let canvas = await html2canvas(cvElement);
    let imgData = canvas.toDataURL('image/png');

    let pdf = new jsPDF('p', 'mm', 'a4');
    let imgWidth = 210;
    let pageHeight = 295;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(watch('title') + '.pdf');
  };

  return (
    <TemplateContext.Provider
      value={{ parts, setParts, partMenu, setPartMenu }}
    >
      <DynamicTemplate
        basicInfor={basicInfor}
        fullname={fullname}
        cvEducations={cvEducations}
        setCvEducations={setCvEducations}
        cvExperiences={cvExperiences}
        setCvExperiences={setCvExperiences}
        cvProjects={cvProjects}
        setCvProjects={setCvProjects}
        cvSkills={cvSkills}
        setCvSkills={setCvSkills}
        cvCertificates={cvCertificates}
        setCvCertificates={setCvCertificates}
        cvPrizes={cvPrizes}
        setCvPrizes={setCvPrizes}
        cvActivities={cvActivities}
        setCvActivities={setCvActivities}
        cvOthers={cvOthers}
        setCvOthers={setCvOthers}
        parts={parts}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        handleDownload={handleDownload}
      />
    </TemplateContext.Provider>
  );
}

const DynamicTemplate = (props) => {
  const { template } = useContext(CandidateContext);

  if (template === 1) {
    return <Template1 {...props} />;
  }

  if (template === 2) {
    return <Template2 {...props} />;
  }

  if (template === 3) {
    return <Template3 {...props} />;
  }

  return <Template1 {...props} />;
};

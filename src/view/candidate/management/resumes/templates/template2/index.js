import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IoCalendarClear } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { IoIosLink } from 'react-icons/io';
import FlexInput, {
  InputReadOnly,
} from '../../../../../../components/FlexInput';
import { ContentItem, InforPart } from '../../components';
import { useContext, useEffect, useRef, useState } from 'react';
import { CandidateContext } from '../../../layouts/CandidateLayout';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

export default function Template2({
  basicInfor,
  setBasicInfor,
  fullname,
  cvEducations,
  setCvEducations,
  cvExperiences,
  setCvExperiences,
  cvProjects,
  setCvProjects,
  cvSkills,
  setCvSkills,
  cvCertificates,
  setCvCertificates,
  cvPrizes,
  setCvPrizes,
  cvActivities,
  setCvActivities,
  cvOthers,
  setCvOthers,
  parts,
  register,
  handleSubmit,
  errors,
  onSubmit,
  handleDownload,
}) {
  const { cvMode } = useContext(CandidateContext);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const Skill = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
      if (name) cvSkills[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvSkills[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          innerClassName={clsx('fw-550', bgColor)}
          placeholder="Tên kỹ năng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Certificate = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [receiveDate, setReceiveDate] = useState('');
    useEffect(() => {
      if (name) cvCertificates[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvCertificates[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          className="w-20"
          innerClassName={clsx('fw-550 ts-sm', bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format('MM/YYYY')
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên chứng chỉ"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Prize = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [receiveDate, setReceiveDate] = useState('');
    useEffect(() => {
      if (name) cvPrizes[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvPrizes[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          className="w-20"
          innerClassName={clsx('fw-550 ts-sm', bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format('MM/YYYY')
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên giải thưởng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Education = ({ infor, index, menu, bgColor }) => {
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (school) cvEducations[index].school = school;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [school]);
    useEffect(() => {
      if (major) cvEducations[index].major = major;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [major]);
    useEffect(() => {
      if (description) cvEducations[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvEducations[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvEducations[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Trường/Trung tâm"
            defaultValue={infor?.school}
            setCurrent={setSchool}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date ? dayjs(infor.start_date).format('YYYY') : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format('YYYY') : null
            }
            setCurrent={setEndDate}
          />
        </div>
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Chuyên ngành"
            defaultValue={infor?.major}
            setCurrent={setMajor}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Mô tả"
            defaultValue={infor?.description}
            setCurrent={setDescription}
          />
        )}
      </div>
    );
  };

  const Experience = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (name) cvExperiences[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (company) cvExperiences[index].company = company;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company]);
    useEffect(() => {
      if (description) cvExperiences[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvExperiences[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvExperiences[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Vị trí việc làm"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format('MM/YYYY') : null
            }
            setCurrent={setEndDate}
          />
        </div>

        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Công ty/Doanh nghiệp"
          defaultValue={infor?.company}
          setCurrent={setCompany}
        />

        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Project = ({ infor, index, menu, bgColor }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [role, setRole] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (name) cvProjects[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (type) cvProjects[index].prj_type = type;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    useEffect(() => {
      if (role) cvProjects[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (technologies) cvProjects[index].technologies = technologies;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologies]);
    useEffect(() => {
      if (link) cvProjects[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvProjects[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvProjects[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvProjects[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format('MM/YYYY') : null
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          innerClassName={clsx('text-capitalize text-secondary ts-sm', bgColor)}
          placeholder="Loại dự án (Cá nhân/Nhóm)"
          defaultValue={infor?.prj_type}
          setCurrent={setType}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx('text-decoration-underline', bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công việc/Vai trò"
            defaultValue={infor?.role}
            setCurrent={setRole}
          />
        )}
        {menu[2].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công nghệ sử dụng"
            defaultValue={infor?.technologies}
            setCurrent={setTechnologies}
          />
        )}
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };

  const Activity = ({ infor, index, menu, bgColor }) => {
    const [organization, setOrganization] = useState('');
    const [role, setRole] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (organization) cvActivities[index].organization = organization;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);
    useEffect(() => {
      if (role) cvActivities[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (link) cvActivities[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvActivities[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvActivities[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvActivities[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.organization}
            setCurrent={setOrganization}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              !infor.is_present
                ? infor.end_date
                  ? dayjs(infor.end_date).format('MM/YYYY')
                  : null
                : 'hiện tại'
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          innerClassName={clsx('text-secondary ts-sm', bgColor)}
          placeholder="Vị trí/Vai trò"
          defaultValue={infor?.role}
          setCurrent={setRole}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx('text-decoration-underline', bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Other = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
      if (name) cvOthers[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvOthers[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          innerClassName={clsx('title', bgColor)}
          placeholder="Khác"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const PersonalPart = ({ bgColor }) => {
    return (
      <InforPart type="personal">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Thông tin cá nhân"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.personalTitle : 'Thông tin cá nhân'
          }
          {...register('personalTitle')}
        />
        <div className="ms-2">
          <FlexInput
            innerClassName={clsx('content', bgColor)}
            iconLeft={<IoCalendarClear className="mb-1" />}
            placeholder="Ngày/tháng/năm sinh"
            defaultValue={
              cvMode !== 'CREATE_0'
                ? dayjs(basicInfor.dob).format('DD/MM/YYYY')
                : null
            }
            {...register('dob')}
          />
          <FlexInput
            innerClassName={clsx('content', bgColor)}
            iconLeft={<FaPhoneAlt className="mb-1" />}
            placeholder="Số điện thoại"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.phone : null}
            {...register('phone')}
          />
          <FlexInput
            innerClassName={clsx('content', bgColor)}
            iconLeft={<IoMdMail className="mb-1" />}
            placeholder="Email"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.email : null}
            {...register('email')}
          />
          <FlexInput
            innerClassName={clsx('content', bgColor)}
            iconLeft={<IoIosLink className="mb-1" />}
            placeholder="Liên kết"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.link : null}
            {...register('link')}
          />
          <FlexInput
            innerClassName={clsx('content', bgColor)}
            iconLeft={<MdLocationOn className="fs-5 mb-1" />}
            placeholder="Địa chỉ"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.address : null}
            {...register('address')}
          />
        </div>
      </InforPart>
    );
  };
  const ObjectivePart = ({ bgColor }) => {
    return (
      <InforPart type="objective">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Mục tiêu nghề nghiệp"
          defaultValue={
            cvMode === 'EDIT'
              ? basicInfor.objectiveTitle
              : 'Mục tiêu nghề nghiệp'
          }
          {...register('objectiveTitle')}
        />
        <FlexInput
          innerClassName={clsx('content', bgColor)}
          placeholder="Nội dung"
          defaultValue={cvMode !== 'CREATE_0' ? basicInfor?.objective : null}
          {...register('objective')}
        />
      </InforPart>
    );
  };
  const SkillPart = ({ bgColor }) => {
    return (
      <InforPart type="skill">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Các kỹ năng"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.skillTitle : 'Các kỹ năng'
          }
          {...register('skillTitle')}
        />
        {cvSkills.map((item, index) => (
          <ContentItem
            key={`skill_${index}`}
            index={index}
            items={cvSkills}
            setItems={setCvSkills}
          >
            <Skill infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const CertificatePart = ({ bgColor }) => {
    return (
      <InforPart type="certificate">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Chứng chỉ"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.certificateTitle : 'Chứng chỉ'
          }
          {...register('certificateTitle')}
        />
        {cvCertificates.map((item, index) => (
          <ContentItem
            key={`certificate_${index}`}
            index={index}
            items={cvCertificates}
            setItems={setCvCertificates}
          >
            <Certificate infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const PrizePart = ({ bgColor }) => {
    return (
      <InforPart type="prize">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Giải thưởng"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.prizeTitle : 'Giải thưởng'
          }
          {...register('prizeTitle')}
        />
        {cvPrizes.map((item, index) => (
          <ContentItem
            key={`prize_${index}`}
            index={index}
            items={cvPrizes}
            setItems={setCvPrizes}
          >
            <Prize infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const EducationPart = ({ bgColor }) => {
    return (
      <InforPart type="education">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Học vấn"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.educationTitle : 'Học vấn'
          }
          {...register('educationTitle')}
        />
        {cvEducations.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`education_${index}`}
            index={index}
            items={cvEducations}
            setItems={setCvEducations}
            menuVaule={[
              { name: 'Chuyên ngành', on: item.major },
              { name: 'Mô tả', on: item.description },
            ]}
          >
            <Education infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const ExperiencePart = ({ bgColor }) => {
    return (
      <InforPart type="experience">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Kinh nghiệm làm việc"
          defaultValue={
            cvMode === 'EDIT'
              ? basicInfor.experienceTitle
              : 'Kinh nghiệm làm việc'
          }
          {...register('experienceTitle')}
        />
        {cvExperiences.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`experience_${index}`}
            index={index}
            items={cvExperiences}
            setItems={setCvExperiences}
          >
            <Experience infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const ProjectPart = ({ bgColor }) => {
    return (
      <InforPart type="project">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Dự án"
          defaultValue={cvMode === 'EDIT' ? basicInfor.projectTitle : 'Dự án'}
          {...register('projectTitle')}
        />
        {cvProjects.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`project_${index}`}
            index={index}
            items={cvProjects}
            setItems={setCvProjects}
            menuVaule={[
              { name: 'Liên kết', on: item.link },
              { name: 'Công việc', on: item.role },
              { name: 'Công nghệ', on: item.technologies },
            ]}
          >
            <Project infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const ActivityPart = ({ bgColor }) => {
    return (
      <InforPart type="activity">
        <InputReadOnly
          textClass="text-red"
          innerClassName={clsx('title', bgColor)}
          placeholder="Hoạt động"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.activityTitle : 'Hoạt động'
          }
          {...register('activityTitle')}
        />
        {cvActivities.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`activity_${index}`}
            index={index}
            items={cvActivities}
            setItems={setCvActivities}
            menuVaule={[{ name: 'Liên kết', on: item.link }]}
          >
            <Activity infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };

  const OtherPart = ({ bgColor }) => {
    return (
      <InforPart type="other">
        {cvOthers.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`other_${index}`}
            index={index}
            items={cvOthers}
            setItems={setCvOthers}
          >
            <Other infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main" />
      </InforPart>
    );
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBasicInfor((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPart = (index) => {
    const bgColor = index <= 5 ? 'cv-bg-main' : '';
    switch (parts[index]) {
      case 'personal':
        return <PersonalPart bgColor={bgColor} />;
      case 'objective':
        return <ObjectivePart bgColor={bgColor} />;
      case 'skill':
        return <SkillPart bgColor={bgColor} />;
      case 'certificate':
        return <CertificatePart bgColor={bgColor} />;
      case 'prize':
        return <PrizePart bgColor={bgColor} />;
      case 'education':
        return <EducationPart bgColor={bgColor} />;
      case 'experience':
        return <ExperiencePart bgColor={bgColor} />;
      case 'project':
        return <ProjectPart bgColor={bgColor} />;
      case 'activity':
        return <ActivityPart bgColor={bgColor} />;
      case 'other':
        return <OtherPart bgColor={bgColor} />;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clearfix ms-3 py-3 border-top shadow-sm bg-white">
          <Form.Group className="float-start ms-3 w-20">
            <Form.Control
              type="text"
              aria-label="resume_title"
              size="sm"
              placeholder="Tiêu đề hồ sơ"
              defaultValue={cvMode === 'EDIT' ? basicInfor.title : null}
              className="border-primary"
              {...register('title', {
                required: 'Vui lòng điền tiêu đề hồ sơ',
              })}
              isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="outline-primary"
            size="sm"
            className="float-end me-5 px-5 py-1"
            onClick={reactToPrintFn}
          >
            <span className="fw-600">Tải xuống CV</span>
          </Button>
          <Button
            type="submit"
            variant="outline-primary"
            size="sm"
            className="float-end me-3 px-5 py-1"
          >
            <span className="fw-600">Lưu</span>
          </Button>
        </div>
        <div
          id="resume"
          ref={contentRef}
          className="mx-auto border mt-4 mb-5 p-2 shadow-sm"
          style={{ width: '800px' }}
        >
          <div className="position-relative mb-10 cv-bg-main ps-1 pe-2 w-100">
            <div className="bg-minimal"></div>
            <div className="mt-2 d-flex flex align-items-center w-100">
              <div style={{ width: '75%' }}>
                <FlexInput
                  placeholder="HỌ TÊN"
                  className="mt-2"
                  innerClassName="cv-bg-main h5 cv-text-main text-uppercase"
                  defaultValue={fullname}
                  {...register('fullname')}
                />
              </div>
              <div style={{ width: '25%' }} className="text-center">
                <img
                  src={basicInfor?.avatar}
                  alt="avatar"
                  width="100px"
                  height="100px"
                  className="rounded-pill"
                />
              </div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <div className="d-flex flex-column">
              <PersonalPart bgColor="cv-bg-main" />
              <ObjectivePart />
              <EducationPart />
              <SkillPart />
              <OtherPart />
            </div>
            <div className="d-flex flex-column">
              <ExperiencePart />
              <ProjectPart />
              <ActivityPart />
              <CertificatePart />
              <PrizePart />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

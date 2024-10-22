import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { CandidateContext } from '../layouts/CandidateLayout';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function CreateOptionDialog({ show, setShow }) {
  const { setCvMode, setTemplate } = useContext(CandidateContext);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleTemplateChange = (id) => {
    setSelectedTemplate(id);
  };

  const nav = useNavigate();
  const handleSelect = (mode) => {
    setCvMode(mode);
    setTemplate(selectedTemplate);
    setShow(false);
    nav('/candidate/resumes/create');
  };
  return (
   
    <Modal show={show} onHide={() => setShow(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chọn phương thức tạo hồ sơ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TemplateList
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
        />
        <Stack direction="vertical" gap={3} className="mt-3">
          <Button
            variant="outline-primary"
            onClick={() => handleSelect('CREATE_0')}
            disabled={!selectedTemplate}
          >
            Tạo mới từ đầu
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => handleSelect('CREATE_1')}
            disabled={!selectedTemplate}
          >
            Tạo từ thông tin Profile
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export const TemplateList = ({ selectedTemplate, onTemplateChange }) => {
  const listTemplate = [
    {
      id: 1,
      name: 'Elegant',
      img: '/image/cv-template-elegant.png',
    },
    {
      id: 2,
      name: 'Minimal',
      img: '/image/cv-template-minimal.png',
    },
    {
      id: 3,
      name: 'Modern',
      img: '/image/cv-template-modern.png',
    },
  ];

  return (
    <>
      <h5 className="text-center mb-3">Chọn mẫu CV</h5>
      <div className="row">
        {listTemplate.map((item) => (
          <TemplateItem
            key={item.id}
            {...item}
            isSelected={selectedTemplate === item.id}
            onTemplateChange={onTemplateChange}
          />
        ))}
      </div>
    </>
  );
};

const TemplateItem = ({ id, name, img, isSelected, onTemplateChange }) => {
  return (
    <div
      onClick={() => onTemplateChange(id)}
      className="col-6 col-md-4 col-lg-4"
    >
      <div className={clsx('card mb-3 template-item')}>
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onTemplateChange(id)}
          />
        </div>
      </div>
    </div>
  );
};

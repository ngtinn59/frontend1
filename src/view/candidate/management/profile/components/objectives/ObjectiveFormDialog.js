import { useForm } from "react-hook-form";
import { Form, Stack, Button } from "react-bootstrap";
import RequiredMark from "../../../../../../components/form/requiredMark/RequiredMark";
import Modal from "react-bootstrap/Modal";
import objectiveApi from "../../../../../../api/objective"; // Adjust the API import as needed
import { useEffect } from "react";

export default function ObjectiveFormDialog({
                                                actType,
                                                setActType,
                                                current,
                                                getAll,
                                            }) {
    const {
        register,
        setError, // Import setError
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        console.log({ data });
        try {
            if (actType === "ADD") {
                await objectiveApi.create(data);
                alert("Tạo mới thành công!");
                await getAll();
                setActType("VIEW");
            }
            if (actType === "EDIT") {
                await objectiveApi.update(current.id, data);
                alert("Cập nhật thành công!");
                await getAll();
                setActType("VIEW");
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                // Iterate through errors from the response and set them for the form
                Object.keys(error.response.data.error).forEach((key) => {
                    const messages = error.response.data.error[key];
                    messages.forEach((message) => {
                        setError(key, {
                            type: "manual",
                            message: message,
                        });
                    });
                });
            }
        }
    };

    return (
        <Modal
            show={actType !== "VIEW"}
            onHide={() => setActType("VIEW")}
            centered
            size="lg"
            fullscreen="md-down"
        >
            <Modal.Header closeButton>
                <Modal.Title>Mục tiêu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="row row-cols-md-2 row-cols-sm-1">
                            <Form.Group className="mt-2">
                                <Form.Label className="fw-600">Tiêu đề</Form.Label>
                                <RequiredMark />
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    defaultValue={actType === "EDIT" ? current.title : null}
                                    {...register("title")}
                                    isInvalid={errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label className="fw-600">Công việc mong muốn</Form.Label>
                                <RequiredMark />
                                <Form.Control
                                    type="text" // Change to a text input
                                    size="sm"
                                    defaultValue={actType === "EDIT" ? current.jtype_id : ""}
                                    {...register("jtype_id")}
                                    isInvalid={errors.jtype_id} // Change to check for description errors
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.jtype_id?.message} // Change to show the description error
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mt-2">
                                <Form.Label className="fw-600">Cấp độ công việc</Form.Label>
                                <RequiredMark />
                                <Form.Control
                                    type="text" // Change to a text input
                                    size="sm"
                                    defaultValue={actType === "EDIT" ? current.jlevel_id : ""}
                                    {...register("jlevel_id")}
                                    isInvalid={errors.jlevel_id}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.jlevel_id?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Add more fields as necessary */}
                        </div>
                    </div>
                    <Stack direction="horizontal" gap={3} className="mt-3">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="submit"
                            className="ms-auto"
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            type="reset"
                            className="me-3"
                            onClick={() => setActType("VIEW")}
                        >
                            Hủy
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

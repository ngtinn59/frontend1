import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useContext, useState } from "react";
import FrameLayout from "../frameLayout";
import dayjs from "dayjs";
import ObjectiveFormDialog from "./ObjectiveFormDialog"; // Import your form dialog component
import objectiveApi from "../../../../../../api/objective"; // Import your API for objectives
import { CandidateContext } from "../../../layouts/CandidateLayout";

export default function Objective() {
    const { objectives, setObjectives, getObjectives } = useContext(CandidateContext); // Replace with actual context
    const [actType, setActType] = useState("VIEW");
    const [current, setCurrent] = useState({});

    const handleDelete = async (id) => {
        let choice = window.confirm("Bạn có chắc muốn xóa Mục tiêu này?");
        if (choice) {
            await objectiveApi.destroy(id); // Call the delete API
            const updatedObjectives = objectives.filter((item) => item.id !== id); // Filter out the deleted item
            setObjectives(updatedObjectives); // Update the context state
        }
    };

    const handleEdit = (item) => {
        setActType("EDIT");
        setCurrent(item); // Set the current item for editing
    };

    return (
        <FrameLayout
            title="Mục tiêu"
            hasaddbtn={true}
            className="mt-4"
            setActType={setActType} // Set the action type
        >
            {objectives?.map((item, index) => (
                <div key={index}>
                    <hr />
                    <div className="border-0 border-success border-start ps-3 d-inline-block">
                        <div className="fw-bold">{item.title}</div>
                        <div className="ts-smd text-secondary">{item.description}</div>
                        {item.desired_location && (
                            <div>
                                <span className="text-secondary ts-xs">
                                    Vị trí mong muốn: {item.desired_location}
                                </span>
                            </div>
                        )}
                        {item.desired_salary && (
                            <div>
                                <span className="text-secondary ts-xs">
                                    Mức lương mong muốn: {item.desired_salary}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 float-lg-end">
                        <Stack direction="horizontal" gap={2}>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEdit(item)} // Edit action
                            >
                                Sửa
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete(item.id)} // Delete action
                            >
                                Xóa
                            </Button>
                        </Stack>
                    </div>
                </div>
            ))}
            {actType !== "VIEW" && (
                <ObjectiveFormDialog
                    actType={actType}
                    setActType={setActType}
                    current={current}
                    getAll={getObjectives} // Function to get the latest objectives
                />
            )}
        </FrameLayout>
    );
}

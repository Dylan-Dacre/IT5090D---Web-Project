import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CompleteGoal = ({ goal, onClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const handleComplete = async () => {
      try {
        const completeGoal = { ...goal };
        completeGoal.completed = true;
        completeGoal.dateCompleted = new Date();

        const response = await fetch(
          `http://localhost:5001/api/goals/${goal._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
            body: JSON.stringify(completeGoal),
          }
        );

        if (response.ok) {
          console.log("Goal marked as completed successfully");
        } else {
          console.error("Error marking goal as completed");
        }
      } catch (error) {
        console.error("Error completing goal", error);
      }

      onClose();
    };

    handleComplete();
  }, [goal, getAccessTokenSilently, onClose]);
};

export default CompleteGoal;

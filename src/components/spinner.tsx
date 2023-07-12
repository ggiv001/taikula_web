import Spinner from "react-bootstrap/Spinner";

export const SpinnerEx = ({ loading }: any) => {
    return (
        <>
            {loading && (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            )}
        </>
    );
};

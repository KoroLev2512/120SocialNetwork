const AddIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            width="68"
            height="68"
            className={className}
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M34.3639 67.8181C28.7406 67.8181 24.1821 63.2596 24.1821 57.6363V10.7272C24.1821 5.10397 28.7406 0.54541 34.3639 0.54541C39.9872 0.54541 44.5457 5.10397 44.5457 10.7272V57.6363C44.5457 63.2596 39.9872 67.8181 34.3639 67.8181ZM10.9094 44.3636C5.2861 44.3636 0.727539 39.805 0.727539 34.1818C0.727539 28.5585 5.2861 24 10.9094 24H57.8184C63.4417 24 68.0003 28.5585 68.0003 34.1818C68.0003 39.805 63.4417 44.3636 57.8184 44.3636H10.9094Z"
                fill="white"
            />
        </svg>
    );
};

export default AddIcon;
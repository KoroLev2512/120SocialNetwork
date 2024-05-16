import React from "react";


export type MessageProps = {
    title: string;
    description: string;
    image?: React.ReactNode;
};

export const Message = (props: MessageProps) => {
    return <div {...props} />;
};

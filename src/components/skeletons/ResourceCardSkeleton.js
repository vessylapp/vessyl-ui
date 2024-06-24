"use client";
import {Card, Divider, CardBody, CardHeader} from "@nextui-org/react";

const ResourceCardSkeleton = () => {
    return (
        <Card variant="bordered" className={"w-[300px]"}>
            <CardHeader className={"px-5 py-5"}>
                <h4 className={"font-bold text-xl"}>...</h4>
                <p className={"text-sm ml-3"}>...</p>
            </CardHeader>
            <Divider/>
            <CardBody className={"px-5 py-5"}>
                <h4 className={"font-bold text-xl"}>...</h4>
                <p>...</p>
            </CardBody>
        </Card>
    );
};

export default ResourceCardSkeleton;
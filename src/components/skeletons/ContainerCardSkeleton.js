"use client";
import {Card, Divider, CardBody, CardHeader} from "@nextui-org/react";

const ContainerCardSkeleton = () => {
    return (
        <Card variant="bordered" className={"w-[300px]"}>
            <CardHeader className={"px-5 py-5"}>
                <h4 className={"font-bold text-xl"}>...</h4>
            </CardHeader>
            <Divider/>
            <CardBody className={"px-5 py-5"}>
                <h4 className={"font-bold text-xl"}>...</h4>
                <p>...</p>
            </CardBody>
        </Card>
    );
};

export default ContainerCardSkeleton;
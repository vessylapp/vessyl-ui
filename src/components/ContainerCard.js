"use client";
import {Card, Divider, CardBody, CardHeader} from "@nextui-org/react";
import Link from "next/link";

const ContainerCard = ({ container }) => {
    const borderColor = container.running ? 'border-green-500' : 'border-red-500';

    return (
        <Link href={`/dashboard/containers/${container.name}`}>
            <Card variant="bordered" className={"w-[300px] border-2 " + borderColor}>
                <CardHeader className={"px-5 py-5"}>
                    <h4 className={"font-bold text-xl"}>{container.name}</h4>
                </CardHeader>
                <Divider/>
                <CardBody className={"px-5 py-5"}>
                    <h4 className={"font-bold text-xl"}>Image</h4>
                    <p>{container.image}</p>
                </CardBody>
            </Card>
        </Link>
    );
};

export default ContainerCard;
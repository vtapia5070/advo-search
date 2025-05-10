import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Advocate } from '@/types/advocate';

interface AdvocateTableProps {
    advocates: Advocate[];
}

export default function AdvocateTable({ advocates }: AdvocateTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Degree</TableHead>
                    <TableHead>Specialties</TableHead>
                    <TableHead>Years of Experience</TableHead>
                    <TableHead>Phone Number</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {advocates.map((advocate, index) => {
                    // TODO make sure id is set and unique
                    return (
                        <TableRow key={`${advocate.id}_${index}`}>
                            <TableCell>{advocate.firstName}</TableCell>
                            <TableCell>{advocate.lastName}</TableCell>
                            <TableCell>{advocate.city}</TableCell>
                            <TableCell>{advocate.degree}</TableCell>
                            <TableCell>
                                {advocate.specialties.map((s) => (
                                    <div key={s}>{s}</div>
                                ))}
                            </TableCell>
                            <TableCell>{advocate.yearsOfExperience}</TableCell>
                            <TableCell>{advocate.phoneNumber}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

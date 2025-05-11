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
    isLoading: boolean;
}

export default function AdvocateTable({
    advocates,
    isLoading,
}: AdvocateTableProps) {
    console.log('advocates', advocates);
    if (isLoading) {
        return <div>Searching..</div>;
    }
    if (!advocates.length) {
        return <div>No advocates found.</div>;
    }
    return (
        <Table className='min-w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead className='p-2 text-left'>First Name</TableHead>
                    <TableHead className='p-2 text-left'>Last Name</TableHead>
                    <TableHead className='p-2 text-left'>City</TableHead>
                    <TableHead className='p-2 text-left'>Degree</TableHead>
                    <TableHead className='p-2 text-left'>Specialties</TableHead>
                    <TableHead className='p-2 text-left'>
                        Years of Experience
                    </TableHead>
                    <TableHead className='p-2 text-left'>
                        Phone Number
                    </TableHead>
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

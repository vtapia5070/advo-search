'use client';

import { useEffect, useState } from 'react';

interface Advocate {
    id: string;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: string;
    phoneNumber: string;
}

export default function Home() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

    useEffect(() => {
        console.log('fetching advocates...');
        fetch('/api/advocates').then((response) => {
            response.json().then((jsonResponse) => {
                setAdvocates(jsonResponse.data);
                setFilteredAdvocates(jsonResponse.data);
            });
        });
    }, []);

    const onChange = (e: any) => {
        setSearchTerm(e.target.value);

        console.log('filtering advocates...');
        const filteredAdvocates = advocates.filter((advocate) => {
            return (
                advocate.firstName.includes(searchTerm) ||
                advocate.lastName.includes(searchTerm) ||
                advocate.city.includes(searchTerm) ||
                advocate.degree.includes(searchTerm) ||
                advocate.specialties.includes(searchTerm) ||
                advocate.yearsOfExperience.includes(searchTerm) ||
                advocate.phoneNumber.includes(searchTerm)
            );
        });

        setFilteredAdvocates(filteredAdvocates);
    };

    const onClick = () => {
        console.log(advocates);
        setFilteredAdvocates(advocates);
    };

    return (
        <main style={{ margin: '24px' }}>
            <h1>Solace Advocates</h1>
            <br />
            <br />
            <div>
                <p>Search</p>
                <p>
                    Searching for: <span id='search-term'>{searchTerm}</span>
                </p>
                <input
                    style={{ border: '1px solid black' }}
                    onChange={onChange}
                />
                <button onClick={onClick}>Reset Search</button>
            </div>
            <br />
            <br />
            <table>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Degree</th>
                    <th>Specialties</th>
                    <th>Years of Experience</th>
                    <th>Phone Number</th>
                </thead>
                <tbody>
                    {filteredAdvocates.map((advocate, index) => {
                        // TODO make sure id is set and unique
                        return (
                            <tr key={`${advocate.id}_${index}`}>
                                <td>{advocate.firstName}</td>
                                <td>{advocate.lastName}</td>
                                <td>{advocate.city}</td>
                                <td>{advocate.degree}</td>
                                <td>
                                    {advocate.specialties.map((s) => (
                                        <div>{s}</div>
                                    ))}
                                </td>
                                <td>{advocate.yearsOfExperience}</td>
                                <td>{advocate.phoneNumber}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    );
}

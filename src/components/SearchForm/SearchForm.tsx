import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
    onReset: () => void;
    searchTerm: string;
}

export default function SearchForm({
    onSearch,
    onReset,
    searchTerm,
}: SearchProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        onSearch(newSearchTerm);
    };

    return (
        <div className='mb-8'>
            <form className='grid grid-cols-12 gap-4'>
                <Input
                    type='text'
                    className='col-span-10'
                    placeholder='Search for advocate'
                    onChange={handleChange}
                    value={searchTerm}
                />
                <Button
                    type='button'
                    variant='secondary'
                    className='col-span-2'
                    onClick={onReset}
                >
                    Reset Search
                </Button>
            </form>
            {searchTerm && (
                <p className='text-gray-600'>Searching for: {searchTerm}</p>
            )}
        </div>
    );
}

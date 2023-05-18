"use client";

import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/services/userApi";
import Image from 'next/image'

function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <p>loading...</p>;
  if (error) return <p>some error</p>;

  return (
    <>
      <div>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>

      <div className="grid grid-cols-3">
        {error ? (
          <p>some error</p>
        ) : isLoading || isFetching ? (
          <p>loading...</p>
        ) : (
          data?.map((user) => (
            <div key={user.id}>
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                className="mx-auto"
                height={180}
                width={180}
              />
              <p className="text-center font-bold mt-4">{user.name}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;

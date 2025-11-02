var arr = [
  {
    guest_type: "crew",
    first_name: "Marco",
    last_name: "Burns",
    guest_booking: {
      room_no: "A0073",
      some_array: [7, 2, 4],
    },
  },
  {
    guest_type: "guest",
    first_name: "John",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Jane",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Albert",
    last_name: "Einstein",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "crew",
    first_name: "Jack",
    last_name: "Daniels",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Alan",
    last_name: "Turing",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
];

function mutateArray(a) {
  const GUEST_TYPE = "guest";

  //1
  const mutate = (obj) => {
    const flatten = Object.entries(obj).reduce((newEntity, [key, value]) => {
      if (typeof value === "object") {
        Object.assign(newEntity, value);
      } else {
        newEntity[key] = value;
      }
      return newEntity;
    }, {});

    //2
    for (const [key, value] of Object.entries(flatten)) {
      if (Array.isArray(value)) {
        flatten[key] = value.reduce((counter, number) => counter + number, 0);
      }
    }

    return flatten;
  };
  //3
  const filterByGuestType = (entity) =>
    [GUEST_TYPE].includes(entity.guest_type);

  //4
  const sortByName = (left, right) => {
    const lastNameCompare = left.last_name.localeCompare(right.last_name);
    if (lastNameCompare !== 0) return lastNameCompare;
    return left.first_name.localeCompare(right.first_name);
  };

  return a.map(mutate).filter(filterByGuestType).sort(sortByName);
}

$(document).ready(function () {
  $("#originalArray").html(JSON.stringify(arr, null, 2));
  $("#resultsArray").html(JSON.stringify(mutateArray(arr), null, 2));
});

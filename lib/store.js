import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist(
    (set) => ({
      loading: true,
      data: [
        {
          name: "الشركة أ",
          price: "",
          count: "",
          goals: [{ price: "", sold: "", time: "" }],
          percent: "",
        },
      ],
      tips: { handClickChart: true,handClickChart2: true,firstTip: true,commissions:true },
      appErrors: {},
      save: [],
      setSave: (val) => set((state) => ({ save: [...state.save, JSON.parse(val)] })),
      setloading: () => set(({ loading: false })),
      deleteSave: (i) => set((state) => {
        const newSave = [...state.save]
        newSave.splice(i,1)
        return { save: newSave }
      }),
      unSave: (val) => set((state) => {
        let newSave = [...state.save]
        newSave = newSave.filter(item => JSON.stringify(item) !== JSON.stringify(val)); 
        return { save: newSave }
      }),
      setAppErrors: (val) => set({ appErrors: val }),
      setTips: (val) =>
        set((state) => ({ tips: { ...state.tips, [val]: false } })),
      setData: (name, data, i) =>
        set((state) => {
          let new_data = [...state.data];
          new_data[i][name] = data;
          return {
            data: new_data,
          };
        }),
      setCount: (data, i,type) =>
        set((state) => {
          let new_data = [...state.data];
          new_data[i].count = type === "inc" ?+new_data[i].count + +data : +new_data[i].count - +data;
          return {
            data: new_data,
          };
        }),
      setDataOnline: (data) => set({ data }),
      setDataGoals: (name, data, ponter, i) =>
        set((state) => {
          let new_data = [...state.data];
          new_data[i].goals[ponter][name] = data;
          return {
            data: new_data,
          };
        }),
      addDataGoals: (i) =>
        set((state) => {
          let new_data = [...state.data];
          new_data[i].goals.push({ price: "", sold: "", time: "" });
          return {
            data: new_data,
          };
        }),
      deleteDataGoal: (i, ponter) =>
        set((state) => {
          let new_data = [...state.data];
          new_data[i].goals.splice(ponter, 1);
          if(new_data[i].goals.length === 1) new_data[i].goals[0].sold = ''
          return {
            data: new_data,
          };
        }),
      clear: (i) =>
        set((state) => {
          let new_data = [...state.data];
          if (i == 0)
            new_data[i] = {
              name: "الشركة أ",
              price: "",
              count: "",
              goals: [{ price: "", sold: "", time: "" }],
              percent: "",
            };
          else new_data.splice(i, 1);

          return {
            data: new_data,
          };
        }),
        clearAll: () =>
        set({
          data: [
            {
              name: "الشركة أ",
              price: "",
              count: "",
              goals: [{ price: "", sold: "", time: "" }],
              percent: "",
            },
          ],
        }),
      addData: () =>
        set((state) => {
          if (state.data.length >= 4) return;
          let name = ["الشركة أ", "الشركة ب", "الشركة ج", "الشركة د"];
          for (let index = 0; index < state.data.length; index++) {
            let posithon = name.indexOf(state.data[index].name);
            if (posithon != -1) name.splice(posithon, 1);
          }
          return {
            data: [
              ...state.data,
              {
                name: name[0],
                price: "",
                count: "",
                goals: [{ price: "", sold: "", time: "" }],
                percent: "",
              },
            ],
          };
        }),
    }),
    {
      name: "storage",
    }
  )
);
export const useUserData = create(
  persist(
    (set) => ({
      userData: {
        name: {},
        time: 0,
        times: 0,
        update: Date.now() + 86400000 * 1,
      },
      setUserData: ({ name, val, time, times, update }) =>
        set((state) => {
          let newUserData = {};
          if (name) newUserData[name] = val;
          else if (time) newUserData.time = +state.userData.time + 10;
          else if (times) newUserData.times = +state.userData.times + 1;
          else if (update) newUserData.update = val;
          return { userData: { ...state.userData, ...newUserData } };
        }),
    }),
    {
      name: "storage2",
    }
  )
);

export const useCommission = create(
  persist(
    (set) => ({
      commissions: {
        commission: "0.125",
        tax: "15",
        market: "0.030",
        on: true
      },
      totalCommission: "0.17825",
      setCommission: (name, data) =>
        set((state) => {
          let new_data = { ...state.commissions };
          new_data[name] = data;
          let sum = +new_data.commission + +new_data.market;
          return {
            commissions: new_data,
            totalCommission: sum + sum * (+new_data.tax / 100),
          };
        }),
      clearCommission: () =>
        set({
          commissions: {
            commission: "0.125",
            tax: "15",
            market: "0.030",
            on: false
          },
          totalCommission: "0.17825",
        }),
    }),
    {
      name: "commissions",
    }
  )
);

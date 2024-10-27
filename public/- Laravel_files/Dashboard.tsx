import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=0f375106"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import AuthenticatedLayout from "/resources/js/Layouts/AuthenticatedLayout.tsx";
import { Head } from "/node_modules/.vite/deps/@inertiajs_react.js?v=0f375106";
import BusSearchForm from "/resources/js/Components/BusSearchForm.tsx?t=1730023497331";
import { useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=0f375106";
import __vite__cjsImport5_react from "/node_modules/.vite/deps/react.js?v=0f375106"; const useEffect = __vite__cjsImport5_react["useEffect"]; const useState = __vite__cjsImport5_react["useState"];
export default function({ auth }) {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location?.pathname);
  useEffect(() => {
    console.log(location?.pathname);
    setCurrentLocation(location?.pathname);
  }, [location]);
  return /* @__PURE__ */ jsxDEV(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxDEV("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: currentLocation?.endsWith("schedule_list") ? "Schedules List" : "Dashboard" }, void 0, false, {
        fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, this),
      children: [
        /* @__PURE__ */ jsxDEV(
          Head,
          {
            title: (
              // currentLocation?.endsWith('dashboard')
              //   ? 'Dashboard'
              //   :
              currentLocation?.endsWith("schedule_list") ? "Schedules List" : "Dashboard"
            )
          },
          void 0,
          false,
          {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 34,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "py-12", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
            "Welcome ",
            auth.user.name,
            "!"
          ] }, void 0, true, {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 54,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 53,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 52,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV(BusSearchForm, { isAuthenticated: true, auth }, void 0, false, {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
            lineNumber: 60,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
          lineNumber: 49,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/elsa/Projects/yathra-mithra/resources/js/Pages/Dashboard.tsx",
      lineNumber: 21,
      columnNumber: 5
    },
    this
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBdUJRO0FBdkJSLE9BQU9BLHlCQUF5QjtBQUNoQyxTQUFTQyxZQUFZO0FBRXJCLE9BQU9DLG1CQUFtQjtBQUMxQixTQUFTQyxtQkFBbUI7QUFDNUIsU0FBU0MsV0FBV0MsZ0JBQWdCO0FBR3BDLHdCQUF5QixFQUFFQyxLQUFnQixHQUFHO0FBQzVDLFFBQU1DLFdBQVdKLFlBQVk7QUFFN0IsUUFBTSxDQUFDSyxpQkFBaUJDLGtCQUFrQixJQUFJSixTQUFTRSxVQUFVRyxRQUFRO0FBRXpFTixZQUFVLE1BQU07QUFDZE8sWUFBUUMsSUFBSUwsVUFBVUcsUUFBUTtBQUU5QkQsdUJBQW1CRixVQUFVRyxRQUFRO0FBQUEsRUFDdkMsR0FBRyxDQUFDSCxRQUFRLENBQUM7QUFFYixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxNQUFNRCxLQUFLTztBQUFBQSxNQUNYLFFBQ0UsdUJBQUMsUUFBRyxXQUFVLHdFQUlYTCwyQkFBaUJNLFNBQVMsZUFBZSxJQUN0QyxtQkFDQSxlQU5OO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFPQTtBQUFBLE1BR0Y7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUlFTixpQkFBaUJNLFNBQVMsZUFBZSxJQUNyQyxtQkFDQTtBQUFBO0FBQUE7QUFBQSxVQVBSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVFHO0FBQUEsUUFPSCx1QkFBQyxTQUFJLFdBQVUsU0FHYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxxQ0FDYixpQ0FBQyxTQUFJLFdBQVUscUVBQ2IsaUNBQUMsU0FBSSxXQUFVLHdDQUFzQztBQUFBO0FBQUEsWUFDMUNSLEtBQUtPLEtBQUtFO0FBQUFBLFlBQUs7QUFBQSxlQUQxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFJQSxLQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTUE7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSxxQ0FDYixpQ0FBQyxpQkFBYyxpQkFBaUIsTUFBTSxRQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpRCxLQURuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0E7QUFBQTtBQUFBO0FBQUEsSUExQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBMkNBO0FBRUoiLCJuYW1lcyI6WyJBdXRoZW50aWNhdGVkTGF5b3V0IiwiSGVhZCIsIkJ1c1NlYXJjaEZvcm0iLCJ1c2VMb2NhdGlvbiIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiYXV0aCIsImxvY2F0aW9uIiwiY3VycmVudExvY2F0aW9uIiwic2V0Q3VycmVudExvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25zb2xlIiwibG9nIiwidXNlciIsImVuZHNXaXRoIiwibmFtZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEYXNoYm9hcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXRoZW50aWNhdGVkTGF5b3V0IGZyb20gJ0AvTGF5b3V0cy9BdXRoZW50aWNhdGVkTGF5b3V0J1xuaW1wb3J0IHsgSGVhZCB9IGZyb20gJ0BpbmVydGlhanMvcmVhY3QnXG5pbXBvcnQgeyBQYWdlUHJvcHMgfSBmcm9tICdAL3R5cGVzJ1xuaW1wb3J0IEJ1c1NlYXJjaEZvcm0gZnJvbSAnLi4vQ29tcG9uZW50cy9CdXNTZWFyY2hGb3JtJ1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE1vdmluZ0J1cyBmcm9tICdAL0NvbXBvbmVudHMvTW92aW5nQnVzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBhdXRoIH06IFBhZ2VQcm9wcykge1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKClcblxuICBjb25zdCBbY3VycmVudExvY2F0aW9uLCBzZXRDdXJyZW50TG9jYXRpb25dID0gdXNlU3RhdGUobG9jYXRpb24/LnBhdGhuYW1lKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2cobG9jYXRpb24/LnBhdGhuYW1lKVxuXG4gICAgc2V0Q3VycmVudExvY2F0aW9uKGxvY2F0aW9uPy5wYXRobmFtZSlcbiAgfSwgW2xvY2F0aW9uXSlcblxuICByZXR1cm4gKFxuICAgIDxBdXRoZW50aWNhdGVkTGF5b3V0XG4gICAgICB1c2VyPXthdXRoLnVzZXJ9XG4gICAgICBoZWFkZXI9e1xuICAgICAgICA8aDIgY2xhc3NOYW1lPSdmb250LXNlbWlib2xkIHRleHQteGwgdGV4dC1ncmF5LTgwMCBkYXJrOnRleHQtZ3JheS0yMDAgbGVhZGluZy10aWdodCc+XG4gICAgICAgICAgey8qIHtjdXJyZW50TG9jYXRpb24/LmVuZHNXaXRoKCdkYXNoYm9hcmQnKVxuICAgICAgICAgICAgPyAnRGFzaGJvYXJkJ1xuICAgICAgICAgICAgOiAgKi99XG4gICAgICAgICAge2N1cnJlbnRMb2NhdGlvbj8uZW5kc1dpdGgoJ3NjaGVkdWxlX2xpc3QnKVxuICAgICAgICAgICAgPyAnU2NoZWR1bGVzIExpc3QnXG4gICAgICAgICAgICA6ICdEYXNoYm9hcmQnfVxuICAgICAgICA8L2gyPlxuICAgICAgfVxuICAgID5cbiAgICAgIDxIZWFkXG4gICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAvLyBjdXJyZW50TG9jYXRpb24/LmVuZHNXaXRoKCdkYXNoYm9hcmQnKVxuICAgICAgICAgIC8vICAgPyAnRGFzaGJvYXJkJ1xuICAgICAgICAgIC8vICAgOlxuICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbj8uZW5kc1dpdGgoJ3NjaGVkdWxlX2xpc3QnKVxuICAgICAgICAgICAgPyAnU2NoZWR1bGVzIExpc3QnXG4gICAgICAgICAgICA6ICdEYXNoYm9hcmQnXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgICB7LyogPGRpdj5cbiAgICAgICAgeycgJ31cbiAgICAgICAgPE1vdmluZ0J1cyAvPlxuICAgICAgPC9kaXY+ICovfVxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncHktMTInPlxuICAgICAgICB7LyogeyhjdXJyZW50TG9jYXRpb24/LmVuZHNXaXRoKCdkYXNoYm9hcmQnKSB8fFxuICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbj8uZW5kc1dpdGgoJy8nKSkgJiYgKCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J21heC13LTd4bCBteC1hdXRvIHNtOnB4LTYgbGc6cHgtOCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JnLXdoaXRlIGRhcms6YmctZ3JheS04MDAgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy1zbSBzbTpyb3VuZGVkLWxnJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwLTYgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtZ3JheS0xMDAnPlxuICAgICAgICAgICAgICBXZWxjb21lIHthdXRoLnVzZXIubmFtZX0hXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiApfSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J21heC13LTd4bCBteC1hdXRvIHNtOnB4LTYgbGc6cHgtOCc+XG4gICAgICAgICAgPEJ1c1NlYXJjaEZvcm0gaXNBdXRoZW50aWNhdGVkPXt0cnVlfSBhdXRoPXthdXRofSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvQXV0aGVudGljYXRlZExheW91dD5cbiAgKVxufVxuIl0sImZpbGUiOiIvaG9tZS9lbHNhL1Byb2plY3RzL3lhdGhyYS1taXRocmEvcmVzb3VyY2VzL2pzL1BhZ2VzL0Rhc2hib2FyZC50c3gifQ==
import.meta.env = {"VITE_APP_NAME": "Laravel", "VITE_PUSHER_APP_KEY": "", "VITE_PUSHER_HOST": "", "VITE_PUSHER_PORT": "443", "VITE_PUSHER_SCHEME": "https", "VITE_PUSHER_APP_CLUSTER": "mt1", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false, "SSR": false};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=0f375106"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import "/resources/js/bootstrap.ts";
import "/resources/css/app.css?t=1730026853383";
import __vite__cjsImport3_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=0f375106"; const createRoot = __vite__cjsImport3_reactDom_client["createRoot"];
import { createInertiaApp } from "/node_modules/.vite/deps/@inertiajs_react.js?v=0f375106";
import { resolvePageComponent } from "/node_modules/.vite/deps/laravel-vite-plugin_inertia-helpers.js?v=0f375106";
import { BrowserRouter as Router } from "/node_modules/.vite/deps/react-router-dom.js?v=0f375106";
const appName = import.meta.env.VITE_APP_NAME || "Yathra-Mithra";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    /* #__PURE__ */ Object.assign({"./Pages/Auth/ConfirmPassword.tsx": () => import("/resources/js/Pages/Auth/ConfirmPassword.tsx"),"./Pages/Auth/ForgotPassword.tsx": () => import("/resources/js/Pages/Auth/ForgotPassword.tsx"),"./Pages/Auth/Login.tsx": () => import("/resources/js/Pages/Auth/Login.tsx"),"./Pages/Auth/Register.tsx": () => import("/resources/js/Pages/Auth/Register.tsx"),"./Pages/Auth/ResetPassword.tsx": () => import("/resources/js/Pages/Auth/ResetPassword.tsx"),"./Pages/Auth/VerifyEmail.tsx": () => import("/resources/js/Pages/Auth/VerifyEmail.tsx"),"./Pages/Contact.tsx": () => import("/resources/js/Pages/Contact.tsx"),"./Pages/Dashboard.tsx": () => import("/resources/js/Pages/Dashboard.tsx?t=1730023497331"),"./Pages/E-Wallet.tsx": () => import("/resources/js/Pages/E-Wallet.tsx"),"./Pages/My_Bookings.tsx": () => import("/resources/js/Pages/My_Bookings.tsx?t=1730026853383"),"./Pages/Profile/Edit.tsx": () => import("/resources/js/Pages/Profile/Edit.tsx"),"./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("/resources/js/Pages/Profile/Partials/DeleteUserForm.tsx"),"./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("/resources/js/Pages/Profile/Partials/UpdatePasswordForm.tsx"),"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("/resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.tsx"),"./Pages/Reservation.tsx": () => import("/resources/js/Pages/Reservation.tsx"),"./Pages/Reservation_Failed.tsx": () => import("/resources/js/Pages/Reservation_Failed.tsx"),"./Pages/Reservation_Success.tsx": () => import("/resources/js/Pages/Reservation_Success.tsx"),"./Pages/ScheduleGuest.tsx": () => import("/resources/js/Pages/ScheduleGuest.tsx"),"./Pages/ScheduleList.tsx": () => import("/resources/js/Pages/ScheduleList.tsx"),"./Pages/Welcome.tsx": () => import("/resources/js/Pages/Welcome.tsx?t=1730023497331")})
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      /* @__PURE__ */ jsxDEV(Router, { children: /* @__PURE__ */ jsxDEV(App, { ...props }, void 0, false, {
        fileName: "/home/elsa/Projects/yathra-mithra/resources/js/app.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "/home/elsa/Projects/yathra-mithra/resources/js/app.tsx",
        lineNumber: 22,
        columnNumber: 7
      }, this)
    );
  },
  progress: {
    color: "#4B5563"
  }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBc0JRO0FBdEJSLE9BQU87QUFDUCxPQUFPO0FBRVAsU0FBU0Esa0JBQWtCO0FBQzNCLFNBQVNDLHdCQUF3QjtBQUNqQyxTQUFTQyw0QkFBNEI7QUFDckMsU0FBU0MsaUJBQWlCQyxjQUFjO0FBRXhDLE1BQU1DLFVBQVVDLFlBQVlDLElBQUlDLGlCQUFpQjtBQUVqRFAsaUJBQWlCO0FBQUEsRUFDZlEsT0FBT0EsQ0FBQ0EsVUFBVyxHQUFFQSxLQUFNLE1BQUtKLE9BQVE7QUFBQSxFQUN4Q0ssU0FBU0EsQ0FBQ0MsU0FDUlQ7QUFBQUEsSUFDRyxXQUFVUyxJQUFLO0FBQUEsSUFDaEJMLFlBQVlNLEtBQUssa0JBQWtCO0FBQUEsRUFDckM7QUFBQSxFQUNGQyxNQUFNLEVBQUVDLElBQUlDLEtBQUtDLE1BQU0sR0FBRztBQUN4QixVQUFNQyxPQUFPakIsV0FBV2MsRUFBRTtBQUUxQkcsU0FBS0M7QUFBQUEsTUFDSCx1QkFBQyxVQUNDLGlDQUFDLE9BQUksR0FBSUYsU0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWUsS0FEakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBRyxVQUFVO0FBQUEsSUFDUkMsT0FBTztBQUFBLEVBQ1Q7QUFDRixDQUFDIiwibmFtZXMiOlsiY3JlYXRlUm9vdCIsImNyZWF0ZUluZXJ0aWFBcHAiLCJyZXNvbHZlUGFnZUNvbXBvbmVudCIsIkJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXIiLCJhcHBOYW1lIiwiaW1wb3J0IiwiZW52IiwiVklURV9BUFBfTkFNRSIsInRpdGxlIiwicmVzb2x2ZSIsIm5hbWUiLCJnbG9iIiwic2V0dXAiLCJlbCIsIkFwcCIsInByb3BzIiwicm9vdCIsInJlbmRlciIsInByb2dyZXNzIiwiY29sb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vYm9vdHN0cmFwJ1xuaW1wb3J0ICcuLi9jc3MvYXBwLmNzcydcblxuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnXG5pbXBvcnQgeyBjcmVhdGVJbmVydGlhQXBwIH0gZnJvbSAnQGluZXJ0aWFqcy9yZWFjdCdcbmltcG9ydCB7IHJlc29sdmVQYWdlQ29tcG9uZW50IH0gZnJvbSAnbGFyYXZlbC12aXRlLXBsdWdpbi9pbmVydGlhLWhlbHBlcnMnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmNvbnN0IGFwcE5hbWUgPSBpbXBvcnQubWV0YS5lbnYuVklURV9BUFBfTkFNRSB8fCAnWWF0aHJhLU1pdGhyYSdcblxuY3JlYXRlSW5lcnRpYUFwcCh7XG4gIHRpdGxlOiAodGl0bGUpID0+IGAke3RpdGxlfSAtICR7YXBwTmFtZX1gLFxuICByZXNvbHZlOiAobmFtZSkgPT5cbiAgICByZXNvbHZlUGFnZUNvbXBvbmVudChcbiAgICAgIGAuL1BhZ2VzLyR7bmFtZX0udHN4YCxcbiAgICAgIGltcG9ydC5tZXRhLmdsb2IoJy4vUGFnZXMvKiovKi50c3gnKVxuICAgICksXG4gIHNldHVwKHsgZWwsIEFwcCwgcHJvcHMgfSkge1xuICAgIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KGVsKVxuXG4gICAgcm9vdC5yZW5kZXIoXG4gICAgICA8Um91dGVyPlxuICAgICAgICA8QXBwIHsuLi5wcm9wc30gLz5cbiAgICAgIDwvUm91dGVyPlxuICAgIClcbiAgfSxcbiAgcHJvZ3Jlc3M6IHtcbiAgICBjb2xvcjogJyM0QjU1NjMnXG4gIH1cbn0pXG4iXSwiZmlsZSI6Ii9ob21lL2Vsc2EvUHJvamVjdHMveWF0aHJhLW1pdGhyYS9yZXNvdXJjZXMvanMvYXBwLnRzeCJ9
import React, { Fragment, useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  console.log(mode, toggleMode);

  const cartItems = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white sticky top-0 z-50  ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {user ? (
                    <Link
                      to={"/allproducts"}
                      className="text-sm font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      All Products
                    </Link>
                  ) : (
                    <Link
                      to={"/login"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Login
                    </Link>
                  )}

                  {user ? (
                    <div className="flow-root">
                      {" "}
                      <Link
                        to={"/order"}
                        style={{ color: mode === "dark" ? "white" : "" }}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Order
                      </Link>{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {user?.user?.email === "nihalsrivastava2424@gmail.com" ? (
                    <div className="flow-root">
                      {" "}
                      (
                      <Link
                        to={"/dashboard"}
                        className="text-sm font-medium text-gray-700 "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Admin
                      </Link>{" "}
                      ){" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <div className="flow-root">
                      <a
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        style={{ color: mode === "dark" ? "white" : "" }}
                        onClick={logout}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="data:image/jpeg;base64,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"
                        alt="Nihal"
                      />{" "}
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-base font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          Get free delivery on orders over ₹300
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1
                      className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      E-Bharat
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <Link
                      to={"/allproducts"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      All Products
                    </Link>
                  ) : (
                    <Link
                      to={"/login"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Login
                    </Link>
                  )}
                  {user ? (
                    <Link
                      to={"/order"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Order
                    </Link>
                  ) : (
                    ""
                  )}

                  {user?.user?.email === "nihalsrivastava2424@gmail.com" ? (
                    <Link
                      to={"/dashboard"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <a
                      className="text-sm font-medium text-gray-700 cursor-pointer  "
                      style={{ color: mode === "dark" ? "white" : "" }}
                      onClick={logout}
                    >
                      Logout
                    </a>
                  ) : (
                    ""
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCADqAJUDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQACAwQGAQf/xABCEAACAQMCBAMGAwQHBwUAAAABAgMABBESIQUxQVETImEGcYGRobEUIzJCUnLBFSQzYpLR4SVDU4Ky8PFkc6Kjwv/EABoBAAIDAQEAAAAAAAAAAAAAAAQFAQIDAAb/xAAwEQACAgEEAAQEBQQDAAAAAAABAgADEQQSITETIkFRBWFx8CMygaGxFELR4SSR8f/aAAwDAQACEQMRAD8ACN76ouSpZMnBzjtircjY5dR9apyb0sqEbWmR10Zrg6V2iIMJ0U6uCngZO3LpmqmaCIU8AmpI4WbkDvRS04bJKGYo2F7Ch7LlQZJhFdLWHAEGJDI2NIJJyduwGSaWhuxrQf0TMdJxtg4PLf1qQ8GdEyw3P6R2+NBnXVD1hg0VmZnNJ9aWDR/+iJQMkb9BVKaykRiAp29KumqRuAZVtK6DJEG04cwSMgEZHLPpUzQSLnKmosUQGB6mBUjuLvgevuFcpV2pnTlKu0qidOb0q7Srp0ifzqaqtnkRv96kVnyMknAwoPQDenFNXmrUeUwdstIQoPvqUQ+XO9IJjep0V3IVefbrXM3tOVJCIfKjBsk51Dqu+BnarlvbPIVAXOcCrENmz4wp9cVreB8EMp1OMAblv3V7D1pfqNXtGByTDatOFG+zgCQcH4L4kqjQGI/U2MqorVw8Et0ULIxKj9mMBR8TzohBbwW0YihQKo39Se7HvU1AjTbzutOT+0Fv17McVeVZWSxsoxhYI8f3l1f9VSNb27ABoYiByyi7fSpajmnt7dNc8scSZwDIwXUeyg7k+6iRQgHCiAl3Y9kmV5OHWLg/khf4Mj6cqG3PAkYHwyCD0YYNXZuMcKglaCW4RJ1lERifyuuUEmtweS4IOT3q3+Jt9RTxFaRQpZIw0jLq5Z0A8+lDvpqm64PyhNep1FWCCcTA8Q4S0LMqKfUdPrWeuLUxk5yO4NetXlmlzGwAAkx5Tjn6GsJxPh8okcEEMP1Z9KrVbZQ2y0/rG9ViatCRwwmVKnPurmCBnoaIyWmnB+YqtIg2z8BTVbA3Uwasr3K1KnMKbWsyIipVylXTpRU71OrZ2NVA1SrJ5emM8vWt2XMERpZ09qu2EWqeM43GQfjVKA5UGiVk4WUDGc/ehLmIUgQ2lQxBmosbNPKFALOygDuScAVtrW3S2hjiXoPMf3m6ms/wCISSiRlwIY9Q/ibyj+daelGlTcxsb6CR8Ut84pHQirtKlTZEzEszPtXxscLs3MF3CkyFTNCYZZHmVwdMCuhAUtg56432xv5/c3XEuLyi94tcuLmSNpbaxtCsUdnbE4UM7nAzjuT762ft9YcPaws7x4lF0L6KBZFJj1q6OxWRlwceUY3z868/jVII3kLeG76dZJ2GkkYXPSs70boRxoSgXcRHp4w/Kbwbe3csJpZZ1ncqww2hU5seW/8AKt57JcWnn/F2yozwtcPcRTMjH8rCJoAQZJJzjJ2C9eQwEVy8U2UmuwrBSpR0ZWA/aCEj716D7HpNdvc3stwXFuTCkZDZLyKCZGYsVxjYADvQiK/igD1+zC9YUagn7/abKh3EbGO4XxAAHA8xxzFEq4QCCDyIxRep04urKjv0+sQVWtUwdZ53fWZj1kHYE1m5iSzDtW54vEF8cbDGaw04KuxPel+gsLrzPS3HeocesrNTa6xpueVOBAD3O0qbmlUyIKpwptSqO3XaizF4GZYt85x35e+i1vG4kTbckYoZAmGUnpjnWks4428J+29LNU+0ZjbSJuIE3nAI9Nq7dSyA/AUVeaGNkWRgmsEqW2U45jPLNDuClTbMB+8D9KIzhDFKWi8YKjOIwAWcqMhVz1PSgdHk0gjvn+Yu1nOobd7xySRSZ0SI2OelgcfKpBWVW9ia9AsEmAlCxxJJ5WM25IAJJAGN88sGtUucDOM4Gccs43o3R6jxtwx1xx1MdRQacZ9f+5n/AGxsmveA3qqgkNu8N2UIJ1JC2W+QJPwryWCKBHjdo47jw4vBBuo9aq+BlwkmBqHIHHwr3a4ltoYZpbqSGO3RT4zzsqRBDsdbNtg8q8J4lLY21/xWLhwFxbRXMq29wJFMTpnbSU3I/wAue9HWqT1L6ZgBgxk6Tz3FpbWYLXMzpDax9ZpWKqFydh3O/IH4+0+z/BxwThdrYmTxZlHiXMuMB5mA1aR+6OQ91eOcAvobXjXAr29kCxx3SvK7DARCCmrA6DNext7Q8DMSvBe287O2mOOJ8u5DaT5QMjqeXry3qF8OsFrDjHrJuZ38iDuFKpy8RsYiimXU7lhGiAs8mnnoUbnHXaohf2XEGv7S2l1Ilt+bcxnMUbyEr4ZY4GobHGeVYl+IXHCb7i89tPbTzStBwwTv54rVcgeKADnSpOpgM5xjpmgtVqCpTZ+U+vfP36ydPpDZuDfmHOIb407apC6aGZclM5IzuM1hbvZj2rYe0EuJ7gFslSEJ5ZKqATisbcnUT9KA0a4ZvqY7IxQg+UpMa5tjbOcnPbFJtqZmnAgLdx2aVNz60qnErBwqZByqJKtRDUQB0+9bucQStcmSpnIzRuxm0hBnny7UL0Dy5zjY8qv26FSNtgcj3Uuvwy4jWoFDmei8BZRGV6uAT76Pdqx3B7vHh42AwK10ciyKrDrzpXoLNrtU3fYgPxKsi3f6Gef8Rs+JcLZprj8TFFDdl7e+tWVsmUtjUqnxMnJB8v33YeP+0tnD+JtLtb62LaZFuF8SSPPlDb4bnsd9u3bQe1TqyWcTAkKZJ1G+7keEDjuATj3+lY9AVjvcKFjfwxM8batY30iKPH6jjmWxt6Vm7jT3EUk4BGR6cxrT/wAmgNcBk9ce0B+0XG+McYR4766lESFXFsFESAj9WEGOhzvnlQJJ48KgyWZcMYgHVtsZ2OQfQ4rVXFt4y+LGNE0YaQo7KYRFjLIxI3J2A/12HpYcMuGPjW6QyJMrGC4URu2qMuNs7jsAeZHLIr0CWqUBMVvUQ21f0gyF47mVoodMbaCzS3G4hiTG4RM7/H/Qlw2EO8jQXFxHFOrCNI0D3UtscedoxkIrEZXLZI6Y3Mtl4VvcBba1gmu0S5JtXgiiit9BKxzu85VTkZIHMfCrpveKwzQRcXltLdZFjuYY4bmOKWMFiiSOI1Ktq6Ek6RvnzbZ2q1qkKcD9P4+/lN6ylLAsMn9RLn4NGSGxkv5Cyr+VDM0OI2Ix/YxhVB77Z71d4P7OyTRpccW4jbRWkVy2OHWmkzTGOQbTSatQ1YGRgnT1GdslDDO1xJPLNdlADKlwsROucNq8TLZOG5jzdfXY1w++u7meeW3twZZctMwMQWQx4iMgdhnGwyM/DqVDK9LE53/X0MZMPGQBPJ9PUQ9xtFbxpvxCyFnZmVY2XzMcncnFZOTqD1yaMXU5jSO3kl8R4wXmfkGdmLEAdhnAoJI+ouwIGOQ770VpFIXmZXcYXPUhkKgnTnG/Pn9KjOBjGeQznvSc0zNNBFznBjsnvSpmaVTM8yBFzvVyFNxVGJm5DlnO3KrsRZv05OPXnXW5kU4hEFQqnO4322qVJ4wQHzjOAe/vp0UGu1eQL5kwxz+73FUZyRpPY/aly4ckRocgZmpsJ0QqFbJOMCthYzEIrA56Ov8ArXmVhLI0yb7czk42G+M16dbxjwIiieUqreUHByMmll9JW0Mvcw1ThkAMDe0s0Fw0CxyNqiQhgqE7tvpbcVhXl8O7ZZcCI6dlZ18NhuMAnOD7/vvpOOOjXN4DMQEYqEicBR6EjcnvvWC4hI0cnlycjUxydkD7Ek/97Vpo0e1i79mbqVqpCiaKae3H+8U55aTkVVkNhd4/EkBz5lYZwDpKjYMuRy2J6UKBtyq5LSEjuQBn0FODWRUK8WnPJgGBHxBpqte3qBs2Y+6e1tGVIeJ3M7DT4rvDFGAEbHhsgLEnbfU4AzQW7mWRssDmabVoJaR0QADm3l5D7dqKSH8KTLbysDKhjYnDB0JDFGyORwM0DuSoMWAFxKDpA2wQRzO/XvRtHB3LBbnJXaxzNHaXLRCOf8RKiqrI6s7MJEKEBREdu2Nhir9kL2xgDlo1MzSuEWIExxu5YIH1Y32ydNDbOQrCDHpWUDPilFdlQDYIGBAOd84o/IxhWKKTLBIbYNq3OTChzmlltY3dcRlS52984/xKMxmZXkcHLYJNVtJx15VfuJPFXSv6BjA5fGpbSzE0M2w1KpOSdioIzj3VY2CtcmXVNxgV9vfUWasXC6SaqnNGociA3KVbE7mlTMmlWuJhmRK4yGAx3xRCxwxbr3xzoQrdKI8NPnl3xlVwc8t6i9cIZOmOXAm1tLFpeGTj9ohtajZlVcMOff8AlWUuYslvPIrZ/ZdsDG36T5fpXoHDeJ8PeCG1jiwXSQAsw0u0UPiSsxPQHArCXsim4n7eI4Pvzg4/lSTSlt5BEaklgwI6g9XuIJQJrlljkjkWOQuyIJcZUSb4x/n6VbPELn/Zccl7dQKzvazotxIpDq/QhsZOefaoGkUDfBAIyDggjsQaffcHkjdZbSMrHKFuGgDCPwpMYDoCcjI5j/PAPZU3DdMBY4BxzKcdxcXIZVuHDanVS8jY0xtpZ9IPuA+PbeO4tyLc3fnlj/M85J5A6FYoNsH486juIbiJX1Mqko6gIxZyDvp1YGAfSjPE5I4YHhQBS8Jt0QbACRNP05/CrHyldg7lFbxFbeepStPEMS4j/ZGcAZ5VOdek+TbtscfOordJEiLK+2DsOuBT28Tw1JYAlVJBHIkZxmrHuY54lWdUGSRjnsRnNB5h4sgQAjJ1EjfSq/8AYoxMJnOlQWwMnkFH8THYfOq8dqsZlmkdXHgTrIseSqqFL517b5AA260VWCBugtg3HEtcMZmiY/s/p39Nv86006vPDBLn8yWytXx3CRiLb/DQDhqrHYISPNuT3PU06y41eJeeGW1W0caReC+6MoYtnvnJNB2oXJKnqF02bAMjuTpIwJUnrt6VreF2kf8AR8zTSLFrOhnlIWIgjZVbnnvjvWdvLaFm/FWrCS2k88kYx4sBO5VlPMdiPjiorzjhmmhYljDbmJIkBHhpoXSxVeQzjJoW6trQAIWlgVe4ziCCOWRR+kMdJyCCvTBFDmBGOW/arU93FdyTvCG8LxZRGzgKXGonOkbDtVYYz0NG1AhcGYahg5yIwg0qsiNGGd6Vab5j4ZgfNWYXdA2htLEDBO+CDncVVqZDyopxkQKttpzLEfFbtH0TAqFDJ5G0Aaj+pD69e4q7DJDdKTK2lyT50YEP6kHeh5YNzGcDrvXEdw6JGQDI6RjYEZdgo2+NCNVkZXgw5Liv5jxC8ctjYSLLOiyYaMiQyHXENX64gpxtzORV/iBuY7lIkVpUlVn1auq89TN8CPf6UGu7C3t49RDNKLwQFpGyMAknC8vpRy81CC3J2PgQuD1GqMUucg7WBzniG1JlijQfdcHmFzw/8Uys9w8MghjyURSwOGPM7f8AZofe3ME17do8bMiyaInDBMsg0tobce+tbxXSIbq+k1FbfhiW8WkgE3F0vgJgnlgFj8KyFtwtrxFe4zHbr+iRNnm338MHp6n4Z6afDr9yeNaeuIPqELHw6xyZb4bH+IuWtw/5MUDXM8gOfDjT9kkDGSdh/pRd7GzisGuTGHnuZPBtPFZtMXPMjAEZIxsPnVJVt7Hh/F0tIli8SOCEld3bU2+pjuT8al4vcSCw4ei7hbgZBIGQUORk8qzst8a0FOAYStPg1kPziUGj4bAyoWe8uF5iRvyY/gPL9DUF9IskEkayAsFwYoExFGvdq6IbG1DePKZCTlFjyoYHcEkb5+PwqpdXyGMW8MKxoXUnA0kKN8Z57+6t60exweTj1PUo7pXWRwM+g7+/rCPDVieGCGZxGjyLHqIY/qPJdPU9Kn4dwm3upAsgkikKPIzKRqHmAAIO3vqvaNOiWnhkI00iRo5A1LqOklSeW2a03DrcxXkxx5RE2Piw2rDU2MhY5+k6gLs+cC31lcWGVEwcHZWC4OSM7qc/es+8VycqBpXu2w7e+tnx5C0czD/dvCxPpgKfvWdbDaemOfrWmjsLVhmlbkB4laMaI0QfsDGQMZJ3NIk7Ht0FSFQu3IU0DJo/MDYHqSo7BRgbdN6VdRQFHLrzYClVDiajOII5gfGpEOwpg+9dWjTFgkvTPcVNYxiXiHC4z+3e2o/+1TUHQVa4WUj4pweRyAicQtCxPIDxVG9ZP+U/SamHON2sxQhV8zcVCgf+5FkfY0S43CYMLj9FvarjrnwlGBWivrGCQ6mXJeSNwMDaRSQrD5kVX40IkupJXUMYlt5EBwF8WPdS3oOfwrytWq3IoP8AaY2qs8+4ev8AqD+K/hYrGztrvDCERy3MX7M1yqKFR8bkJv8AP0rPO91cq0yqFhycM7eHGcf3uZA7AVZYrcl7q+bMUWqbTJ+ltWMPJ8uXrQTiXEp7t2RAUhGAMjDFegUDYCjNNQ1mEX/QmniLQCzf+yw8iG2ul8VZMzwDKroXIxsqnfHvqfi7f1MEY8ksXMZABBUnBoHbNkSRA8pVcgeg60Y4xn+jbojnmHH+MUQ1XhahFPv/AImiW+Lp3b5f5lKOGxKQGR5AI1gV2BGo+IryPpz+75QPj2pQxcP8VCU8R/DaRVYjSvL8w6wScdsAe/nQ+3gvZ/CjwYoncEyzqyKTg4xkZPpShuYo5PEcnXNGiOdmGhZC7OSOmCB8PWm1gypQGJUYKQxELz+Ld+DDbpF4iO0yyMzmRtGAFUEhAd85I6dKI8N4xdWMpg4hE5H6Qx2kUehOx91CuGNLJcQTFdMPhTCLU2WeQGPUdPYbj/xWqu7FL2IKUGsLmN9tQPYntSfVMteEYZEYUKLcknBieWK8WddSZuozFFgjJdlOAFJ1dN9qywJyB1G5+1GeFGVZmt5co9tIRIQBq8h5Z7d6H8Qh/DcQvowPKZDLH/BJ+YAPnj4V2mAVig+s1tB2g/pKkmdWMdM0l7mlnU2fQilTD0gZ7zHYzvSppBPLNKokwQCT8KerEGos08FTR5EVgyyrIMgjORt3BprbbZ+I51Hnka6WyNtz0HcnYCs8TbdkYnrXs9fpxbhthNKQLlSIplJGWeJtJcDnhsZ/8U3jyRP+K1gkaYzseZyBj41W9mbIWw4ehHmhhJb+PQc/UmrHH43liuUj/tGChMdWXzAV41lVbmCdZjNa/CcAn0mD4heRFmVmBCbtpI0od8ehPbt9gFzNczkLHH4UQzpB2LZ3LMTuSepq7bw6nnnm5+M4iU8sj9oj7Vy6UZ1dga9RpwtA2r3BbybJU4cpSWQFsnwyT2GCK1N4jtZXPh51iFpAV5jQA+R8jWasBqmnYcvDI+ZrZwRq0ttG/wCiX8l/4ZUMZ+9Ba1sWhvaH6IfglfeZzh/EmTTHcBZYdgRINQx60QPBuDSMt1aMqkjHgSuXhB3Owb6b1n2hkhlkicYeJ2Rh/eQlTU6RsrZSR42O5MbEH6UWyf3IcZi8EjyuM4hNxc29zAJU0lEbw8Y0svcEVr4WD20Uq8njVx7iARWIS6YkRTt4jhozBIQA2k5Vg2Ns8vnWns+IW9vwS1lmAJWW4swGYIgaJyRrY9MEcgaD1lLPSCByD/MIpcK+PeUJ5vB4vcOpIVktvExyJdNJH2pnHRn8FP1MbQOfWMkj6VBY+JxK7adBqsoZpZ5Z3GPxNwowscY/dU4J9wHutcWGqybvG4kHwwDWFY8O1FPcPbz0sRAaH1ruQN9+1RITjlTyRsabkRUG4kmT0NKovE91Kq4MncIJzThTaWaYxZHFqvcJgNzxC0Qg6FfxX7YTcfXFD60ns1GDNI/VjHAPTJ1H7ihtS3h1EiFaVPEtUHqej8OxEofl5MD44P8AlQb2m4lDZ2c8rHMkhaGBQRlpGUjPuA3NF5W8K3Q7AEnJOwG2dzXlPtFxQ8Ru5GVs20OqG1HdQfNIfVj9Mdq8v8P051F/PQjG58Zs95yzJ/DQk9dbfNjUN3JgY75pltcIY40B3VMAd6q3Emo6uhJxXpQmWgG7iE+GoM+rKSficVtAgVYJDtp8Js+4isXwdi8si/uIPvmtzMv9TJ/9KW+S5pH8RJW4LGtbAICszntVafg71ZwVxeapioIJV9g2cd+dCoiHUnPQVDePqgYAnyOJFGWK45HANRWs/lKk9acrTsQAcwC5ybOY66cpJCwO6upHw3rVcHt7Hitrf2N2jSQw31txBEDsgbxYWTS+nBxkHIzWNuZA8igdGArQ+y90U4mIsnTcWrxn1aEh1/nWlgIpbHsZmpBxn3mnnhitwEhRI4ohoRI1CoqEYAUDahd95oWQ8mVx8xRu8GVlODsgZvTsTQS5IIA9M/WvN6Y5cZj5eUxMrHIR5T0qVn8u1VTnU2/7R5e+nFjj6V6YrnmecDY4kpJOCCOXXvSqENtSqcSN0rUq5mlREGna13s0mDZd5bhm+RwPtWQzW39nkC3HB0JAxpJz0zGzE0Brz+ERGXw8edm9hDPtffi04bDaRn+sXrEjHNIFyrN8Tt8DXllznLfugbfatDx3iTcUv7u6BPghvw9ouf0wx5Vfnux9TQG7Ayij+6D8K3+H6X+noAPZ5MFtsLH5SvErkEg8uXzqeVPyt9gFyTjOAOZxTrVAYyT6/TNSyY8Js9EYfSrM3mkKvEL8HtZLS44hDNjxIHSPI5OuNauvowII99bbT4ltEn/EtZI/8URUUHkii/C8GnRVE0tjDFM4HmcRRRadR9MnFHbPDW8GcZXwxXltY5ttDmOHUU17R95nlC3DBWjfdWGBn5VXUyLqK56jarLwgSSD9lXcY7EMRTIgNTD+I16w8KIpsJZsmVRIdSZz+qi3CLxLS/s7mQsFimLHSMnBGnbO1C7mMKyY6g/SrfCYUu+J8LtnAMc1wPFBzuiqZGG3fFS23w2J6wZmpIYL85puH8WvbVneN5RJIzGVtWVl1NklyTv9aJtfcMuDmaBUfq1u5iHPnp3T/wCNMm9neDwozxC6TrpFzIVH+LJ+tCpLeyt0lkCFiqOwMrNJyBI2bb6V59RVccpnMdqrgbuo2eH2YtlkfXeXU25jh/EIqFj/AMRoYwcd9/8AMBtWdRwBz2HIegzUOeVOztkfGnVdZQYJJiVnDHgYjs0qYWpVriUzI6VKlWkpF0rWfiHtLeS4ixrjjKx+hkUxZ+tZPvRu5uA9jZaT5ZCpf3xpjB+JPyoW6vxGVT1mHaSwIlh+UokhVQDp3qjO2XU+tFrm3htre0ZpNVxcwGZl/YiDY0qBzz6+vpQo4yTz99GLcrjKwRlK8GS2+0PvLUy4byaAf1EL867EdMQz2quXLTR9lOo/DehgMtNN2BibiymM9hYH/gRtGR20qqfyFHbOQ+CnbKj5GstwGTX+Mh6eGsy/E6T/ACrUWkf9XI6hj9a87rFFb4hr2F1z9P4nnnErS7tLmaVk/ImmmMbruuPEbyns3pVGE+dvca297FHMb22mGY3dsgYBUhiQyk9ax11bmxvZYCdS4WSJjjLRuMjOOvQ+6nlF/iptPcz1FBQLYOjIbkZ8H3kfMVf9lY9fGrVj/uIbmX46PCH/AFVTnGVT0INXvZ+VLOea6Y4Ijd/+VAxC/E4q9uTSwHqIKuPEBM295cIbWUqwz40tuCO6EhsfasdxK6OuSBeWhFb36tR/kKsrfOthbCQ+YGeY5P6pJ5Wk+2KCSOXd3Jzk0Jo9N4ZOYdfqPwgo7MaedSLvtUY32p69fSmRi0RhBBNKnnBNKpzOxIqVcpVeVnau2hMsc1uT/ZpNcRDPNwmMD71Rp0cjRurqcMpyPsRVGGRxLo21snqPkmklEIY58OMRqT+6vKozyPurma6o1EdutTgKOJTJJnWOIlA7b1BBuZH/AOUfc1PONKbDcnAqCHyxgerE/OqpLPNH7PXltaT3Mt0+mFLdgxwTqywwoA33o37NcZuLue/ju5EIcxtCqqEVMsVwMdNwB7qwwcgOByYAH4HNSQXElvIskZIZWRhg48yMGH1oPUaJbgxPZ/aXWzGAeprLu5CcUvrdyA3424hwTg7ZYHB+HzrN8bcNxAsOUaxRE/8AKD/OmXF5JcXs96xPiTTmc5JJBJzjPpyFVpnMrTOeblm/mKvRp/DwT7TezVF6hWfQyRjqQfCmxkhdGcBvKx/u5yaajZQj0BrmdzRCj0gzH1k80xlYdEXZB2FRU3NdBrQDHAlScnJnakByPXrUddzUEZnAzpO9Km5FKpxOzG0qVcNTKmImuAseQJrh5j30+MnxFGdsGqscSVXM6sTk+bYfWpSyJtkbdBTn2Q4+lUm51nkt3NcbepNLMGAUDmRn4VXVjgjsxpGuDlV1GJkxzH6q7qpldq8pHaqWquVw10mT26qxOTsPrXJRob0O4rkH/wCqluP0D+MfY1kD5pqR5ZBqrur1qPrXa1mMmVhn4UjzNMHOnHlUS2ZzNKuUqmTP/9k="
                      alt="Nihal"
                    />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className="" onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === "light" ? (
                      <FiSun className="" size={30} />
                    ) : "dark" ? (
                      <BsFillCloudSunFill size={30} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span
                      className="ml-2 text-sm font-medium text-gray-700 group-"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {cartItems.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

const notification = (msg, img, value) => {
    return {notif: {
        element: `<div class="flex justify-between w-full" id=notif>
                        <div class="flex items-center gap-5">
                            <img src="assets/img/icon/${img}" alt="" class="w-10">
                            <p class="text-sky-800 text-sm me-5">${msg}</p>
                        </div>
                    </div>`,
        class: value
    }}
}

module.exports = notification;
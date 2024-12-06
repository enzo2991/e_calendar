local openUI = false

local function openCalendar()
    openUI = true
    if openUI then
        local data = lib.callback.await('e_calendar:getData',false)
        SendNUIMessage({
            action = 'openUI',
            data = data
        })
        SetNuiFocus(true, true)
    end
end

local function closeCalendar()
    openUI = false
    SetNuiFocus(false, false)
end

RegisterNetEvent('e_calendar:open',function()
    openCalendar()
end)

RegisterNUICallback("openCase", function(data,_)
    TriggerServerEvent('e_calendar:openCard',data)
end)

RegisterNUICallback("closeUI", function(_,_)
    closeCalendar()
end)

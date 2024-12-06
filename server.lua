ESX = exports["es_extended"]:getSharedObject()

lib.callback.register('e_calendar:getData',function()
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer then
        if not xPlayer.getMeta('calendar') then
            local data = {}
            for i=1,25 do
                data[i] = {id = i, isOpen = false}
            end
            xPlayer.setMeta('calendar', data)
        end
        return xPlayer.getMeta('calendar')
    end
end)

RegisterNetEvent('e_calendar:openCard',function(id)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer then
        local data = xPlayer.getMeta('calendar')
        if data[id] and not data[id].isOpen then
            if xPlayer.canCarryItem(Config.case[id].item,Config.case[id].number) then
                data[id].isOpen = true
                xPlayer.setMeta('calendar', data)
                xPlayer.addInventoryItem(Config.case[id].item,Config.case[id].number)
            end
        end
    end
end)

if Config.Debug then
    ESX.RegisterCommand('calendar',function(xPlayer, args, showError)
        xPlayer.triggerEvent('e_calendar:open')
    end,false)
end

ESX.RegisterUsableItem("calendar",function(source)
    TriggerClientEvent('e_calendar:open',source)
end)